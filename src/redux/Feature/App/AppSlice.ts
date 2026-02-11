import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isInitialLoading: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialLoading: (state, action) => {
      state.isInitialLoading = action.payload;
    },
  },
});

export const { setInitialLoading } = appSlice.actions;

// selector
export const selectIsInitialLoading = (state) => state.app.isInitialLoading;

export default appSlice.reducer;
