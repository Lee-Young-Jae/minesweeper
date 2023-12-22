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

export const GAME = {
  GAME_RULES,
};
