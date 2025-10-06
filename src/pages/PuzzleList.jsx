// src/pages/PuzzleList.jsx
import React from "react";
import { Link } from "react-router-dom";

const puzzles = [
  { id: 1, preview: "/assets/puzzles/puzzle1.png", record: 20, best: 20 },
  { id: 2, preview: "/assets/puzzles/puzzle2.png", record: null, best: null },
  { id: 3, preview: "/assets/puzzles/puzzle3.png", record: null, best: null },
  { id: 4, preview: "/assets/puzzles/puzzle4.png", record: null, best: null },
  // add more puzzles here...
];

const PuzzleList = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-cyan-400 drop-shadow-[0_0_10px_#00ffff]">Unblock Me - Levels</h1>
      <div className="w-full max-w-md flex flex-col gap-4">
        {puzzles.map((puzzle) => (
          <Link
            to={`/games/unblockme/${puzzle.id}`}
            key={puzzle.id}
            className="flex items-center justify-between bg-[#0b1120] rounded-xl p-4 shadow-[0_0_15px_#00ffff40] hover:shadow-[0_0_25px_#00ffff80] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={puzzle.preview}
                alt={`Puzzle ${puzzle.id}`}
                className="w-12 h-12 border rounded flex items-center justify-center"
              />
              <div>
                <h2 className="text-lg font-semibold">Puzzle {puzzle.id}</h2>
                <p className="text-sm text-gray-400">
                  Your record:{" "}
                  {puzzle.record ? puzzle.record : "Not played yet"}
                </p>
              </div>
            </div>
            <div className="text-cyan-400 font-bold">
              {puzzle.best ? `★ ${puzzle.best}` : "--"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PuzzleList;
