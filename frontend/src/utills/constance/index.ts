const GAME_RULES = {
  MAX_ROW: 100,
  MAX_COL: 100,
  MAX_MINE: (function () {
    const MAX_ROW = 100;
    const MAX_COL = 100;
    return Math.floor((MAX_ROW * MAX_COL) / 3);
  })(),
  MIN_ROW: 3,
  MIN_COL: 3,
  MIN_MINE: 1,
};

const DIFFICULTY = {
  BEGINNER: {
    row: 8,
    col: 8,
    mine: 10,
  },
  INTERMEDIATE: {
    row: 16,
    col: 16,
    mine: 40,
  },
  EXPERT: {
    row: 16,
    col: 30,
    mine: 99,
  },
};

const EMOTION = {
  HAPPY: "😀",
  SURPRISED: "😮",
  DEAD: "💀",
  WIN: "🤩",
};

export const GAME = {
  GAME_RULES,
  DIFFICULTY,
  EMOTION,
};
