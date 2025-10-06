import React, { useEffect, useState } from "react";

export default function ScoreBoard({ currentScore }) {
  const [bestScore, setBestScore] = useState(0);
  const [topScores, setTopScores] = useState([]);

  // Load scores from localStorage when component mounts
  useEffect(() => {
    const storedBest = parseInt(localStorage.getItem("bestScore")) || 0;
    const storedTop = JSON.parse(localStorage.getItem("topScores")) || [];
    setBestScore(storedBest);
    setTopScores(storedTop);
  }, []);

  // Update best + top scores whenever current score changes
  useEffect(() => {
    if (currentScore > 0) {
      let updatedTop = [...topScores, currentScore]
        .sort((a, b) => b - a)
        .slice(0, 5);

      const newBest = updatedTop[0];
      setBestScore(newBest);
      setTopScores(updatedTop);

      localStorage.setItem("bestScore", newBest);
      localStorage.setItem("topScores", JSON.stringify(updatedTop));
    }
    // eslint-disable-next-line
  }, [currentScore]);

  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-2xl shadow-lg w-64 mx-auto">
      <h2 className="text-xl font-bold mb-2 text-yellow-400">🏆 Score Board</h2>

      <div className="text-center mb-3">
        <p className="text-lg font-semibold text-blue-300">
          Current Score: <span className="text-white">{currentScore}</span>
        </p>
        <p className="text-lg font-semibold text-green-400">
          Best Score: <span className="text-white">{bestScore}</span>
        </p>
      </div>

      {topScores.length > 1 && (
        <div className="text-sm w-full">
          <h3 className="font-semibold text-gray-300 mb-1 text-center">
            Top 5 Scores:
          </h3>
          <ul className="text-gray-400 space-y-1 text-center">
            {topScores.map((score, index) => (
              <li key={index} className="text-sm">
                #{index + 1} — <span className="text-yellow-400">{score}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



