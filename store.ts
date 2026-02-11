import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./src/redux/Feature/App/AppSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

// 👇 THIS is what RootState is
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
