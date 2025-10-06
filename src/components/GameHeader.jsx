// src/components/ui/GameHeader.jsx
import React from "react";

const GameHeader = ({ title, theme, setTheme, level, setLevel }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        {/* Level selector */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="px-3 py-1 rounded bg-slate-700 text-white border border-slate-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Theme toggle */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="px-3 py-1 rounded bg-slate-700 text-white border border-slate-500"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="gradient">Gradient</option>
        </select>
      </div>
    </div>
  );
};

export default GameHeader;
