import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import todoReducer from "./todoSlice.js";

// Redux Store Configuration
// This file sets up the Redux store for the application, combining reducers for user and todos state management.
// It also integrates Redux Persist to enable state persistence using localStorage, ensuring that the state is saved across page reloads and application restarts.

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "todolist",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
