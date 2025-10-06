// src/pages/WaterLevel.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { getHighScore, saveHighScore } from "../lib/api";
import GameHeader from "../components/GameHeader";

const defaultContainers = (level) => {
  if (level === "easy")
    return [
      { id: 0, cap: 8, amt: 8 },
      { id: 1, cap: 5, amt: 0 },
      { id: 2, cap: 3, amt: 0 },
      { id: 3, cap: 2, amt: 0 },
    ];
  if (level === "medium")
    return [
      { id: 0, cap: 12, amt: 12 },
      { id: 1, cap: 8, amt: 0 },
      { id: 2, cap: 5, amt: 0 },
      { id: 3, cap: 3, amt: 0 },
    ];
  return [
    { id: 0, cap: 15, amt: 15 },
    { id: 1, cap: 10, amt: 0 },
    { id: 2, cap: 7, amt: 0 },
    { id: 3, cap: 5, amt: 0 },
  ];
};

const WaterLevel = () => {
  const [theme, setTheme] = useState("light");
  const [level, setLevel] = useState("easy");
  const [containers, setContainers] = useState(defaultContainers("easy"));
  const [moves, setMoves] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setContainers(defaultContainers(level));
    setMoves(0);
    setWin(false);
    (async () => {
      const hs = await getHighScore("waterlevel");
      setHighScore(hs || 0);
    })();
  }, [level]);

  const pour = (fromId, toId) => {
    if (fromId === toId) return;
    setContainers((prev) => {
      const arr = prev.map((c) => ({ ...c }));
      const from = arr.find((c) => c.id === fromId);
      const to = arr.find((c) => c.id === toId);
      const amount = Math.min(from.amt, to.cap - to.amt);
      if (amount === 0) return prev;
      from.amt -= amount;
      to.amt += amount;
      setMoves((m) => m + 1);
      setTimeout(() => checkWin(arr), 300);
      return arr;
    });
  };

  const checkWin = async (arr) => {
    // Win condition: any container half full
    const success = arr.some((c) => c.amt === Math.floor(c.cap / 2));
    if (success) {
      const score = Math.max(100 - moves * 3, 5);
      setWin(true);
      if (score > highScore) {
        await saveHighScore("waterlevel", score);
        setHighScore(score);
      }
    }
  };

  const reset = () => {
    setMoves(0);
    setWin(false);
    setContainers(defaultContainers(level));
  };

  const bgClass =
    theme === "dark"
      ? "bg-slate-900 text-white"
      : theme === "light"
      ? "bg-gradient-to-r from-blue-50 to-purple-100 text-gray-900"
      : "bg-gradient-to-r from-yellow-50 to-green-100 text-gray-800";

  const currentScore = Math.max(0, 100 - moves * 3);

  return (
    <div className={`${bgClass} min-h-screen p-6`}>
      {win && <Confetti />}

      <GameHeader
        title="💧 Water Level Puzzle"
        theme={theme}
        setTheme={setTheme}
        level={level}
        setLevel={setLevel}
      />

      {/* ✅ Static Scoreboard Section */}
      <div className="mt-4 mb-8 flex flex-col sm:flex-row justify-center gap-4">
        <div
          className={`px-6 py-3 rounded-xl shadow text-center ${
            theme === "dark" ? "bg-slate-800 text-white" : "bg-white/30 backdrop-blur-md"
          }`}
        >
          <p className="text-sm opacity-80">💯 Score</p>
          <p className="text-2xl font-bold">{currentScore}</p>
        </div>

        <div
          className={`px-6 py-3 rounded-xl shadow text-center ${
            theme === "dark" ? "bg-slate-800 text-white" : "bg-white/30 backdrop-blur-md"
          }`}
        >
          <p className="text-sm opacity-80">🏆 High Score</p>
          <p className="text-2xl font-bold">{highScore}</p>
        </div>

        <div
          className={`px-6 py-3 rounded-xl shadow text-center ${
            theme === "dark" ? "bg-slate-800 text-white" : "bg-white/30 backdrop-blur-md"
          }`}
        >
          <p className="text-sm opacity-80">🪄 Moves</p>
          <p className="text-2xl font-bold">{moves}</p>
        </div>
      </div>

      {/* Game Area */}
      <div className="mt-10 flex gap-8 justify-center flex-wrap">
        {containers.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-2">
            {/* Tank */}
            <div className="w-28 h-48 bg-white/20 rounded-lg relative overflow-hidden border-2 border-blue-300 shadow-lg backdrop-blur">
              <AnimatePresence initial={false}>
                <motion.div
                  layout
                  key={c.amt}
                  initial={{ height: 0 }}
                  animate={{ height: `${(c.amt / c.cap) * 100}%` }}
                  transition={{ duration: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 bg-blue-500/80"
                />
              </AnimatePresence>
            </div>
            <div className="text-sm font-semibold">Cap: {c.cap}</div>
            <div className="text-sm font-semibold">Amt: {c.amt}</div>
            <div className="flex gap-2 mt-1 flex-wrap justify-center">
              {containers
                .filter((x) => x.id !== c.id)
                .map((other) => (
                  <button
                    key={other.id}
                    onClick={() => pour(c.id, other.id)}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-xs shadow hover:scale-105 transition"
                  >
                    Pour → #{other.id}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-3 justify-center">
        <button
          onClick={reset}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold shadow hover:scale-105 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default WaterLevel;


