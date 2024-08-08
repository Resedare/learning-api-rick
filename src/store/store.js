import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./createSlice";

const store = configureStore({
  reducer: { characters: characterReducer },
});

export default store;
