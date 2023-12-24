import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME } from "../utills/constance";
import { generateEmptyBoard } from "../utills/game";

const loadDifficultyFromLocalStorage = (): {
  row: number;
  col: number;
  mine: number;
} => {
  const difficulty = localStorage.getItem("difficulty");
  if (difficulty) {
    return JSON.parse(difficulty);
  }
  return GAME.DIFFICULTY.BEGINNER;
};

const loadIsDifficultyCustom = (): boolean => {
  const isDifficultyCustom = localStorage.getItem("isDifficultyCustom");
  if (isDifficultyCustom) {
    return JSON.parse(isDifficultyCustom);
  }
  return false;
};

const saveDifficultyToLocalStorage = (difficulty: {
  row: number;
  col: number;
  mine: number;
}) => {
  localStorage.setItem("difficulty", JSON.stringify(difficulty));
};

const saveIsDifficultyCustomToLocalStorage = (isDifficultyCustom: boolean) => {
  localStorage.setItem(
    "isDifficultyCustom",
    JSON.stringify(isDifficultyCustom)
  );
};

const initialDifficulty = loadDifficultyFromLocalStorage();

const initialState = {
  difficulty: initialDifficulty,
  isDifficultyCustom: loadIsDifficultyCustom(),
  isGaming: false,
  emotion: GAME.EMOTION.HAPPY,
  mineCount: GAME.DIFFICULTY.BEGINNER.mine,
  elapsedTime: 0,
  board: generateEmptyBoard(initialDifficulty.row, initialDifficulty.col),
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty(
      state,
      action: PayloadAction<{
        row: number;
        col: number;
        mine: number;
      }>
    ) {
      state.difficulty = action.payload;
      saveDifficultyToLocalStorage(action.payload);
    },
    setIsDifficultyCustom(state, action: PayloadAction<boolean>) {
      state.isDifficultyCustom = action.payload;
      saveIsDifficultyCustomToLocalStorage(action.payload);
    },
    setIsGaming(state, action: PayloadAction<boolean>) {
      state.isGaming = action.payload;
    },
    setEmotion(state, action: PayloadAction<string>) {
      state.emotion = action.payload;
    },
    setMineCount(state) {
      const { mine } = state.difficulty;
      state.mineCount = state.board.reduce((acc, row) => {
        return (
          acc -
          row.reduce((acc, col) => {
            return acc + (col.isFlag ? 1 : 0);
          }, 0)
        );
      }, mine);
    },
    setElapsedTime(state, action: PayloadAction<number>) {
      state.elapsedTime = action.payload;
    },
    setBoard(
      state,
      action: PayloadAction<
        {
          x: number;
          y: number;
          isMine: boolean;
          isFlag: boolean;
          isRevealed: boolean;
          neighbour: number;
        }[][]
      >
    ) {
      state.board = action.payload;
    },

    resetGame(state) {
      state.isGaming = false;
      state.emotion = GAME.EMOTION.HAPPY;
      state.mineCount = state.difficulty.mine;
      state.elapsedTime = 0;
      state.board = generateEmptyBoard(
        state.difficulty.row,
        state.difficulty.col
      );
    },
  },
});

export const {
  setDifficulty,
  setIsDifficultyCustom,
  setIsGaming,
  setEmotion,
  setMineCount,
  setBoard,
  setElapsedTime,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
