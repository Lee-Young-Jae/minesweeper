import { combineReducers } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";

const rootReducer = combineReducers({
  game: gameSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
