import { createSlice } from "@reduxjs/toolkit";

/* Tab Redux Slice */
const initialState = {
  activeTab: null,
};

/* Tabs Slice Definition */
const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    SET_TAB: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { SET_TAB } = tabSlice.actions;
export default tabSlice.reducer;