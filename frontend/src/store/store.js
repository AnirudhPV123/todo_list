import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./storeSlice";
import todoSlice from "./todoSlice";


const store = configureStore({
  reducer: {
    auth: authSlice,
    todo:todoSlice
  },
});

export default store;
