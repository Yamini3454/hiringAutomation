import { useState, useEffect } from "react";
import LevelSelector from "../components/LevelSelector";
import GameBoard from "../components/Gameboard";
import { levels } from "../data/levels";

const UnblockMe = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);

  // Load completed levels from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("unblockme-completed");
    if (saved) {
      setCompletedLevels(JSON.parse(saved));
    }
  }, []);

  const handleSelectLevel = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleLevelComplete = () => {
    if (selectedLevel && !completedLevels.includes(selectedLevel)) {
      const updated = [...completedLevels, selectedLevel];
      setCompletedLevels(updated);
      localStorage.setItem("unblockme-completed", JSON.stringify(updated));
    }

    // Auto-advance to next level
    const nextLevel = selectedLevel + 1;
    if (nextLevel <= levels.length) {
      setTimeout(() => {
        setSelectedLevel(nextLevel);
      }, 2000);
    } else {
      setTimeout(() => {
        setSelectedLevel(null);
      }, 2000);
    }
  };

  const handleBack = () => {
    setSelectedLevel(null);
  };

  const currentLevel = levels.find((l) => l.id === selectedLevel);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 text-amber-100 flex items-center justify-center">
      {!selectedLevel || !currentLevel ? (
        <LevelSelector
          onSelectLevel={handleSelectLevel}
          completedLevels={completedLevels}
        />
      ) : (
        <GameBoard
          level={currentLevel}
          onComplete={handleLevelComplete}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default UnblockMe;











