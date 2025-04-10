import { createSlice } from "@reduxjs/toolkit";

/* Movies Search Redux Slice */
const initialMoviesState = {
  searchQuery: "",
};

const moviesSearchSlice = createSlice({
  name: "moviesSearch",
  initialState: initialMoviesState,
  reducers: {
    SET_MOVIES_SEARCH_QUERY: (state, action) => {
      state.searchQuery = action.payload;
    },
    CLEAR_MOVIES_SEARCH_QUERY: (state) => {
      state.searchQuery = "";
    },
  },
});

/* Members Search Redux Slice */
const initialMembersState = {
  searchQuery: "",
};

const membersSearchSlice = createSlice({
  name: "membersSearch",
  initialState: initialMembersState,
  reducers: {
    SET_MEMBERS_SEARCH_QUERY: (state, action) => {
      state.searchQuery = action.payload;
    },
    CLEAR_MEMBERS_SEARCH_QUERY: (state) => {
      state.searchQuery = "";
    },
  },
});

export const { SET_MOVIES_SEARCH_QUERY, CLEAR_MOVIES_SEARCH_QUERY } =
  moviesSearchSlice.actions;
export const { SET_MEMBERS_SEARCH_QUERY, CLEAR_MEMBERS_SEARCH_QUERY } =
  membersSearchSlice.actions;

export const moviesSearchReducer = moviesSearchSlice.reducer;
export const membersSearchReducer = membersSearchSlice.reducer;