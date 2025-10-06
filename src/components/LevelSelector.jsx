import React, { useState } from "react";
import { getDifficulties } from "../data/levels";
import { Button } from "./ui/button";
import { Trophy, Lock } from "lucide-react";

export default function LevelSelector({ onSelectLevel, completedLevels }) {
  const difficulties = getDifficulties();
  const [expandedDifficulty, setExpandedDifficulty] = useState("Starter");

  return (
    <div className="min-h-screen bg-green-900 text-amber-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-amber-100 mb-2 drop-shadow-lg">
            Unblock Me
          </h1>
          <p className="text-amber-200 text-lg">Choose Your Challenge</p>
        </div>

        {/* Difficulty Levels */}
        <div className="space-y-4 bg-amber-900/20 rounded-2xl p-5 shadow-lg border border-amber-700/50">
          {difficulties.map((diff) => (
            <div key={diff.name} className="space-y-2">
              {/* Difficulty Button */}
              <Button
                onClick={() =>
                  setExpandedDifficulty(
                    expandedDifficulty === diff.name ? "" : diff.name
                  )
                }
                className="w-full bg-amber-800/90 hover:bg-amber-700 text-amber-100 border border-amber-600 rounded-xl py-4 shadow-md transition-all hover:scale-[1.02] hover:shadow-amber-700/50"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-amber-300" />
                    <span className="text-lg font-semibold">{diff.name}</span>
                  </div>
                  <span className="text-sm text-amber-200">
                    {
                      diff.levels.filter((l) =>
                        completedLevels.includes(l.id)
                      ).length
                    }
                    /{diff.levels.length}
                  </span>
                </div>
              </Button>

              {/* Expanded Levels */}
              {expandedDifficulty === diff.name && (
                <div className="grid grid-cols-2 gap-3 pl-3 transition-all duration-300">
                  {diff.levels.map((level) => {
                    const isCompleted = completedLevels.includes(level.id);
                    const isLocked =
                      level.id > 1 && !completedLevels.includes(level.id - 1);

                    return (
                      <Button
                        key={level.id}
                        onClick={() => !isLocked && onSelectLevel(level.id)}
                        disabled={isLocked}
                        className={`
                          h-auto py-3 rounded-lg transition-all duration-200
                          ${
                            isCompleted
                              ? "bg-amber-700 text-amber-100 hover:bg-amber-600 hover:scale-105 shadow-lg"
                              : isLocked
                              ? "bg-amber-950/60 text-amber-600 cursor-not-allowed border border-amber-800"
                              : "bg-amber-800 hover:bg-amber-700 hover:scale-105 text-amber-100 shadow-md"
                          }
                        `}
                      >
                        <div className="flex flex-col items-center gap-1">
                          {isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : isCompleted ? (
                            <Trophy className="w-4 h-4 text-amber-300" />
                          ) : null}
                          <span className="font-medium">
                            Level {level.id}
                          </span>
                          <span className="text-xs text-amber-200">
                            Min: {level.minMoves} moves
                          </span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="text-center bg-amber-900/30 rounded-xl p-4 border border-amber-700/50 shadow-md">
          <div className="text-sm text-amber-300">Completed Levels</div>
          <div className="text-3xl font-bold text-amber-100">
            {completedLevels.length} /{" "}
            {difficulties.reduce((sum, d) => sum + d.levels.length, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

