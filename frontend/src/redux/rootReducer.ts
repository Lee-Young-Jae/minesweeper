import { combineReducers } from "@reduxjs/toolkit";
// import {gameReducer} from "./gameSlice";

const rootReducer = combineReducers({
  // game: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
