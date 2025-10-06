// src/components/GameBoard.jsx
import React, { useState, useRef, useEffect } from "react";
import GameBlock from "./GameBlock";

export default function GameBoard({ level, onComplete, onBack }) {
  const GRID_SIZE = 6;
  const [cellSize, setCellSize] = useState(60);
  const [blocks, setBlocks] = useState(level.blocks);
  const [moves, setMoves] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const boardRef = useRef(null);

  // Responsive cell size
  useEffect(() => {
    const updateCellSize = () => {
      const maxWidth = Math.min(window.innerWidth - 40, 500);
      const maxHeight = window.innerHeight - 300;
      const size = Math.floor(Math.min(maxWidth, maxHeight) / GRID_SIZE);
      setCellSize(size);
    };
    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  // Reset when level changes
  useEffect(() => {
    setBlocks(level.blocks);
    setMoves(0);
  }, [level]);

  // Check if block can move
  const canMove = (blockId, newX, newY) => {
    const movingBlock = blocks.find((b) => b.id === blockId);
    if (!movingBlock) return false;

    if (
      newX < 0 ||
      newY < 0 ||
      newX + movingBlock.width > GRID_SIZE ||
      newY + movingBlock.height > GRID_SIZE
    )
      return false;

    for (const block of blocks) {
      if (block.id === blockId) continue;
      const overlap =
        newX < block.x + block.width &&
        newX + movingBlock.width > block.x &&
        newY < block.y + block.height &&
        newY + movingBlock.height > block.y;
      if (overlap) return false;
    }

    return true;
  };

  // Handle movement
  const handleMove = (blockId, newX, newY) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, x: newX, y: newY } : block
      )
    );
    setMoves((prev) => prev + 1);

    const movedBlock = blocks.find((b) => b.id === blockId);

    // ✅ Level complete check updated here
    if (movedBlock?.isTarget && newX + movedBlock.width === GRID_SIZE && newY === 2) {
      setCelebrating(true);
      createConfetti();
      setTimeout(() => {
        alert(`🎉 Level Complete! Solved in ${moves + 1} moves`);
        setCelebrating(false);
        onComplete(moves + 1); // ✅ Pass score to parent component
      }, 800);
    }
  };

  // Simple confetti animation
  const createConfetti = () => {
    if (!boardRef.current) return;
    for (let i = 0; i < 25; i++) {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 5}px;
        height: ${Math.random() * 8 + 5}px;
        background: hsl(${Math.random() * 360}, 70%, 60%);
        left: ${Math.random() * 100}%;
        top: 50%;
        border-radius: 50%;
        animation: confetti-fall ${Math.random() * 2 + 2}s ease-out forwards;
        pointer-events: none;
        z-index: 100;
      `;
      boardRef.current.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  };

  const handleReset = () => {
    setBlocks(level.blocks);
    setMoves(0);
    alert("🔄 Level reset");
  };

  const handleHint = () => {
    setShowHint(true);
    alert("💡 Hint: Move the red block to the right exit!");
    setTimeout(() => setShowHint(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Celebration emoji */}
      {celebrating && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl font-bold animate-bounce">🎉</div>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between bg-yellow-200 rounded-xl p-4 shadow-lg">
        <button
          onClick={onBack}
          className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md shadow-md"
        >
          ⬅ Back
        </button>

        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-yellow-800">Level {level.id}</div>
          <div className="text-sm text-gray-600">{level.difficulty}</div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-xl font-bold text-gray-800">{moves}</div>
          <div className="text-xs text-gray-500">Moves</div>
          <div className="text-xs text-gray-500">Best: {level.minMoves}</div>
        </div>
      </div>

      {/* Game Board */}
      <div
        ref={boardRef}
        className="relative bg-yellow-300 rounded-2xl border-4 border-yellow-800 overflow-hidden shadow-inner"
        style={{
          width: `${GRID_SIZE * cellSize}px`,
          height: `${GRID_SIZE * cellSize}px`,
        }}
      >
        {/* Exit */}
        <div
          className="absolute right-0 bg-yellow-100 border-l-4 border-yellow-500"
          style={{
            top: `${2 * cellSize}px`,
            width: `${cellSize / 3}px`,
            height: `${cellSize}px`,
          }}
        />

        {/* Blocks */}
        {blocks.map((block) => (
          <GameBlock
            key={block.id}
            block={block}
            gridSize={GRID_SIZE}
            cellSize={cellSize}
            onMove={handleMove}
            canMove={canMove}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-md"
        >
          🔄 Reset
        </button>
        <button
          onClick={handleHint}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg shadow-md"
        >
          💡 Hint
        </button>
      </div>
    </div>
  );
}

