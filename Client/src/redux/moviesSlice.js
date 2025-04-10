import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Movies Redux Slice */
const MOVIES_URL = "http://localhost:4000/movies";

export const FETCH_MOVIES = createAsyncThunk(
  "movies/FETCH_MOVIES",
  async () => {
    const response = await axios.get(MOVIES_URL);
    return response.data;
  }
);

export const FETCH_MOVIE_BY_ID = createAsyncThunk(
  "movies/FETCH_MOVIE_BY_ID",
  async (movieId) => {
    const response = await axios.get(`${MOVIES_URL}/${movieId}`);
    return response.data;
  }
);

export const ADD_MOVIE = createAsyncThunk(
  "movies/ADD_MOVIE",
  async (newMovie) => {
    const response = await axios.post(MOVIES_URL, newMovie);
    return response.data;
  }
);

export const UPDATE_MOVIE = createAsyncThunk(
  "movies/UPDATE_MOVIE",
  async ({ movieId, updatedMovie }) => {
    const response = await axios.put(`${MOVIES_URL}/${movieId}`, updatedMovie);
    return response.data;
  }
);

export const DELETE_MOVIE = createAsyncThunk(
  "movies/DELETE_MOVIE",
  async (movieId) => {
    await axios.delete(`${MOVIES_URL}/${movieId}`);
    return movieId;
  }
);

/* Movies Slice Definition */
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    currentMovie: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith("movies/"),
      (state, action) => {
        switch (action.type) {
          case FETCH_MOVIES.fulfilled.type:
            state.movies = action.payload;
            break;
          case FETCH_MOVIE_BY_ID.fulfilled.type:
            state.currentMovie = action.payload;
            break;
          case ADD_MOVIE.fulfilled.type:
            state.movies.push(action.payload);
            break;
          case UPDATE_MOVIE.fulfilled.type:
            state.movies = state.movies.map((movie) =>
              movie._id === action.payload._id ? action.payload : movie
            );
            break;
          case DELETE_MOVIE.fulfilled.type:
            state.movies = state.movies.filter(
              (movie) => movie._id !== action.payload
            );
            break;
          default:
            break;
        }
      }
    );
  },
});

export default moviesSlice.reducer;
