import React, { useState, useRef, useEffect } from "react";

export default function GameBlock({ block, gridSize, cellSize, onMove, canMove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const blockRef = useRef(null);

  const isHorizontal = block.width > block.height;
  const blockColor = block.isTarget ? "bg-red-500" : "bg-amber-700";

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = blockRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = blockRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !blockRef.current) return;

      const boardRect = blockRef.current.parentElement?.getBoundingClientRect();
      if (!boardRect) return;

      let newX = block.x;
      let newY = block.y;

      if (isHorizontal) {
        // Only horizontal movement
        const mouseX = e.clientX - boardRect.left - dragOffset.x;
        newX = Math.round(mouseX / cellSize);
        newX = Math.max(0, Math.min(gridSize - block.width, newX));
      } else {
        // Only vertical movement
        const mouseY = e.clientY - boardRect.top - dragOffset.y;
        newY = Math.round(mouseY / cellSize);
        newY = Math.max(0, Math.min(gridSize - block.height, newY));
      }

      if ((newX !== block.x || newY !== block.y) && canMove(block.id, newX, newY)) {
        onMove(block.id, newX, newY);
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || !blockRef.current) return;

      const touch = e.touches[0];
      const boardRect = blockRef.current.parentElement?.getBoundingClientRect();
      if (!boardRect) return;

      let newX = block.x;
      let newY = block.y;

      if (isHorizontal) {
        const touchX = touch.clientX - boardRect.left - dragOffset.x;
        newX = Math.round(touchX / cellSize);
        newX = Math.max(0, Math.min(gridSize - block.width, newX));
      } else {
        const touchY = touch.clientY - boardRect.top - dragOffset.y;
        newY = Math.round(touchY / cellSize);
        newY = Math.max(0, Math.min(gridSize - block.height, newY));
      }

      if ((newX !== block.x || newY !== block.y) && canMove(block.id, newX, newY)) {
        onMove(block.id, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, block, dragOffset, cellSize, gridSize, isHorizontal, canMove, onMove]);

  return (
    <div
      ref={blockRef}
      className={`
        absolute rounded-lg border-2 border-black/30 cursor-grab active:cursor-grabbing
        ${blockColor} shadow-lg
        ${isDragging ? "z-50 scale-105 shadow-xl" : "z-10 transition-all duration-200 ease-out"}
        ${block.isTarget ? "animate-pulse ring-2 ring-red-500/50" : ""}
      `}
      style={{
        left: `${block.x * cellSize}px`,
        top: `${block.y * cellSize}px`,
        width: `${block.width * cellSize}px`,
        height: `${block.height * cellSize}px`,
        backgroundImage: !block.isTarget
          ? `repeating-linear-gradient(
              90deg,
              hsl(30 50% 55%),
              hsl(30 50% 55%) 4px,
              hsl(30 45% 50%) 4px,
              hsl(30 45% 50%) 8px
            )`
          : undefined,
        transition: isDragging ? "none" : "left 0.2s ease-out, top 0.2s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="w-full h-full flex items-center justify-center">
        {block.isTarget && (
          <div className="text-white font-bold text-sm md:text-base animate-pulse">EXIT</div>
        )}
      </div>
    </div>
  );
}
