// src/pages/Minesweeper.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ScoreBoard from "../components/ScoreBoard";
import GameHeader from "../components/GameHeader";

const levelConfig = {
  easy: { size: 6, mines: 6 },
  medium: { size: 9, mines: 14 },
  hard: { size: 12, mines: 28 },
};

const createEmptyBoard = (size) =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      revealed: false,
      flagged: false,
      mine: false,
      near: 0,
    }))
  );

const placeMines = (board, mines) => {
  const size = board.length;
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  // count nearby mines
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const ni = i + dr,
            nj = j + dc;
          if (
            ni >= 0 &&
            ni < size &&
            nj >= 0 &&
            nj < size &&
            board[ni][nj].mine
          )
            count++;
        }
      }
      board[i][j].near = count;
    }
  }
  return board;
};

export default function Minesweeper() {
  const [theme, setTheme] = useState("dark");
  const [level, setLevel] = useState("easy");
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  // initialize board
  useEffect(() => {
    resetBoard();
  }, [level]);

  // timer logic
  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver]);

  const resetBoard = () => {
    const { size, mines } = levelConfig[level];
    const empty = createEmptyBoard(size);
    const filled = placeMines(empty, mines);
    setBoard(filled);
    setScore(0);
    setGameOver(false);
    setTime(0);
    clearInterval(timerRef.current);
  };

  const revealRecursive = (r, c, newB) => {
    const size = newB.length;
    if (newB[r][c].revealed || newB[r][c].flagged) return;
    newB[r][c].revealed = true;
    if (newB[r][c].near === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const ni = r + dr,
            nj = c + dc;
          if (ni >= 0 && ni < size && nj >= 0 && nj < size)
            revealRecursive(ni, nj, newB);
        }
      }
    }
  };

  const handleClick = (r, c) => {
    if (gameOver) return;
    const newB = board.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newB[r][c];

    if (cell.flagged || cell.revealed) return;

    if (cell.mine) {
      // Game over
      newB.forEach((row) =>
        row.forEach((cell) => {
          if (cell.mine) cell.revealed = true;
        })
      );
      setBoard(newB);
      setGameOver(true);
      clearInterval(timerRef.current);
      return;
    }

    revealRecursive(r, c, newB);
    const revealedCount = newB.flat().filter((c) => c.revealed).length;
    setScore(revealedCount);
    setBoard(newB);

    // check win
    const totalCells = newB.length * newB.length;
    const totalMines = newB.flat().filter((c) => c.mine).length;
    if (revealedCount === totalCells - totalMines) {
      setGameOver(true);
      clearInterval(timerRef.current);
    }
  };

  const handleRightClick = (r, c, e) => {
    e.preventDefault();
    if (gameOver) return;
    const newB = board.map((row) => row.map((cell) => ({ ...cell })));
    newB[r][c].flagged = !newB[r][c].flagged;
    setBoard(newB);
  };

  const bgClass =
    theme === "dark"
      ? "bg-slate-900 text-white"
      : theme === "light"
      ? "bg-white text-slate-900"
      : "bg-gradient-to-r from-pink-600 to-yellow-400 text-black";

  return (
    <div
      className={`${bgClass} min-h-screen flex flex-col items-center py-10 overflow-hidden`}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GameHeader
          title="Minesweeper"
          theme={theme}
          setTheme={setTheme}
          level={level}
          setLevel={setLevel}
        />
      </motion.div>

      {/* Scoreboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6"
      >
        <ScoreBoard currentScore={score} />
      </motion.div>

      {/* Timer + Status */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={`mt-3 text-sm ${
          gameOver ? "text-red-400" : "text-gray-400"
        } transition-all`}
      >
        ⏱ Time: {time}s {gameOver && "| 💣 Game Over!"}
      </motion.p>

      {/* Game Board Container */}
      <motion.div
        key={level} // triggers animation when level changes
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="mt-8 p-5 bg-[#0D1117] rounded-2xl border border-[#03DAC5]/30 shadow-[0_0_25px_rgba(3,218,197,0.3)]"
      >
        <motion.div
          layout
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${board.length || 6}, 45px)`,
          }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => (
              <motion.div
                key={`${r}-${c}`}
                whileTap={{ scale: 0.9 }}
                whileHover={{
                  scale: !cell.revealed ? 1.05 : 1,
                  boxShadow: !cell.revealed
                    ? "0 0 12px rgba(3,218,197,0.4)"
                    : "none",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => handleClick(r, c)}
                onContextMenu={(e) => handleRightClick(r, c, e)}
                className={`h-11 w-11 flex items-center justify-center rounded-md border text-sm font-semibold select-none cursor-pointer
                  ${
                    cell.revealed
                      ? cell.mine
                        ? "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,0,0.6)]"
                        : "bg-gray-200 text-gray-800 shadow-inner"
                      : "bg-[#1F2937] text-white hover:bg-[#2D3748] shadow-[0_0_8px_rgba(3,218,197,0.3)]"
                  }`}
              >
                {cell.revealed
                  ? cell.mine
                    ? "💣"
                    : cell.near || ""
                  : cell.flagged
                  ? "🚩"
                  : ""}
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetBoard}
        className="mt-8 px-6 py-2 rounded-lg bg-[#03DAC5] text-black font-semibold hover:bg-[#02c0ad] transition-all shadow-[0_0_10px_rgba(3,218,197,0.6)]"
      >
        🔁 Reset Game
      </motion.button>
    </div>
  );

}



