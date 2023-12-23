import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  difficulty: "easy",
  isDifficultyCustom: false,
  isStarted: false,
  emotion: "😀",
  mineCount: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty(state, action: PayloadAction<string>) {
      state.difficulty = action.payload;
    },
    setIsDifficultyCustom(state, action: PayloadAction<boolean>) {
      state.isDifficultyCustom = action.payload;
    },
    setIsStarted(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },
    setEmotion(state, action: PayloadAction<string>) {
      state.emotion = action.payload;
    },
    setMineCount(state, action: PayloadAction<number>) {
      state.mineCount = action.payload;
    },
  },
});

export const {
  setDifficulty,
  setIsDifficultyCustom,
  setIsStarted,
  setEmotion,
  setMineCount,
} = gameSlice.actions;
