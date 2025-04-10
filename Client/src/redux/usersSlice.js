import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Users Redux Slice */
const USERS_URL = "http://localhost:4000/users";

export const FETCH_USERS = createAsyncThunk("users/FETCH_USERS", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

export const FETCH_USER_BY_ID = createAsyncThunk(
  "users/FETCH_USER_BY_ID",
  async (userId) => {
    const response = await axios.get(`${USERS_URL}/${userId}`);
    return response.data;
  }
);

export const ADD_USER = createAsyncThunk("users/ADD_USER", async (newUser) => {
  const response = await axios.post(USERS_URL, newUser);
  return response.data;
});

export const UPDATE_USER = createAsyncThunk(
  "users/UPDATE_USER",
  async ({ userId, updatedUser }) => {
    const response = await axios.put(`${USERS_URL}/${userId}`, updatedUser);
    return response.data;
  }
);

export const DELETE_USER = createAsyncThunk(
  "users/DELETE_USER",
  async (userId) => {
    await axios.delete(`${USERS_URL}/${userId}`);
    return userId;
  }
);

export const RESET_CURRENT_USER = () => ({ type: "users/RESET_CURRENT_USER" });

/* Users Slice Definition */
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith("users/"),
      (state, action) => {
        switch (action.type) {
          case FETCH_USERS.fulfilled.type:
            state.users = action.payload;
            break;
          case FETCH_USER_BY_ID.fulfilled.type:
            state.currentUser = action.payload;
            break;
          case ADD_USER.fulfilled.type:
            state.users.push(action.payload);
            break;
          case UPDATE_USER.fulfilled.type:
            state.users = state.users.map((user) =>
              user._id === action.payload._id ? action.payload : user
            );
            break;
          case DELETE_USER.fulfilled.type:
            state.users = state.users.filter(
              (user) => user._id !== action.payload
            );
            break;
          case "users/RESET_CURRENT_USER":
            state.currentUser = null;
            break;
          default:
            break;
        }
      }
    );
  },
});

export default userSlice.reducer;
