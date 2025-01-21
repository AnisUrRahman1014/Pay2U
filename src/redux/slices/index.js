import { combineReducers } from "@reduxjs/toolkit";
import persistSlice from "./persistSlice";

export const combinedReducers = combineReducers({
  persistSlice,
});
