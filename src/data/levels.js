export const levels = [
  // STARTER LEVELS
  {
    id: 1,
    name: "Level 1",
    difficulty: "Starter",
    minMoves: 5,
    blocks: [
      { id: 1, x: 1, y: 2, width: 2, height: 1, isTarget: true },
      { id: 2, x: 0, y: 0, width: 1, height: 2, isTarget: false },
      { id: 3, x: 1, y: 3, width: 2, height: 1, isTarget: false },
      { id: 4, x: 3, y: 0, width: 1, height: 2, isTarget: false },
      { id: 5, x: 4, y: 3, width: 1, height: 3, isTarget: false },
    ],
  },
  {
    id: 2,
    name: "Level 2",
    difficulty: "Starter",
    minMoves: 8,
    blocks: [
      { id: 1, x: 0, y: 2, width: 2, height: 1, isTarget: true },
      { id: 2, x: 0, y: 0, width: 1, height: 2, isTarget: false },
      { id: 3, x: 2, y: 0, width: 1, height: 2, isTarget: false },
      { id: 4, x: 2, y: 2, width: 1, height: 2, isTarget: false },
      { id: 5, x: 3, y: 1, width: 2, height: 1, isTarget: false },
      { id: 6, x: 0, y: 4, width: 2, height: 1, isTarget: false },
      { id: 7, x: 3, y: 4, width: 1, height: 2, isTarget: false },
    ],
  },

  // BEGINNER LEVELS
  {
    id: 3,
    name: "Level 3",
    difficulty: "Beginner",
    minMoves: 10,
    blocks: [
      { id: 1, x: 2, y: 2, width: 2, height: 1, isTarget: true },
      { id: 2, x: 0, y: 0, width: 1, height: 2, isTarget: false },
      { id: 3, x: 1, y: 0, width: 2, height: 1, isTarget: false },
      { id: 4, x: 0, y: 2, width: 1, height: 2, isTarget: false },
      { id: 5, x: 1, y: 3, width: 1, height: 3, isTarget: false },
      { id: 6, x: 4, y: 0, width: 1, height: 2, isTarget: false },
      { id: 7, x: 4, y: 2, width: 1, height: 2, isTarget: false },
      { id: 8, x: 2, y: 4, width: 2, height: 1, isTarget: false },
    ],
  },
  {
    id: 4,
    name: "Level 4",
    difficulty: "Beginner",
    minMoves: 12,
    blocks: [
      { id: 1, x: 1, y: 2, width: 2, height: 1, isTarget: true },
      { id: 2, x: 0, y: 0, width: 1, height: 3, isTarget: false },
      { id: 3, x: 1, y: 0, width: 1, height: 2, isTarget: false },
      { id: 4, x: 2, y: 0, width: 1, height: 2, isTarget: false },
      { id: 5, x: 3, y: 1, width: 1, height: 2, isTarget: false },
      { id: 6, x: 4, y: 0, width: 1, height: 3, isTarget: false },
      { id: 7, x: 1, y: 3, width: 2, height: 1, isTarget: false },
      { id: 8, x: 0, y: 4, width: 1, height: 2, isTarget: false },
      { id: 9, x: 3, y: 4, width: 2, height: 1, isTarget: false },
    ],
  },

  // INTERMEDIATE LEVELS
  {
    id: 5,
    name: "Level 5",
    difficulty: "Intermediate",
    minMoves: 15,
    blocks: [
      { id: 1, x: 0, y: 2, width: 2, height: 1, isTarget: true },
      { id: 2, x: 0, y: 0, width: 1, height: 2, isTarget: false },
      { id: 3, x: 1, y: 0, width: 1, height: 2, isTarget: false },
      { id: 4, x: 2, y: 0, width: 1, height: 3, isTarget: false },
      { id: 5, x: 3, y: 0, width: 2, height: 1, isTarget: false },
      { id: 6, x: 3, y: 1, width: 1, height: 2, isTarget: false },
      { id: 7, x: 4, y: 3, width: 1, height: 2, isTarget: false },
      { id: 8, x: 0, y: 3, width: 1, height: 3, isTarget: false },
      { id: 9, x: 1, y: 4, width: 2, height: 1, isTarget: false },
      { id: 10, x: 2, y: 5, width: 2, height: 1, isTarget: false },
    ],
  },

  // You can include rest of the levels (6 to 10) as is...
]

export const getDifficulties = () => {
  const difficulties = ["Starter", "Beginner", "Intermediate", "Advanced", "Expert"];
  return difficulties.map(diff => ({
    name: diff,
    levels: levels.filter(l => l.difficulty === diff),
  }));
};
