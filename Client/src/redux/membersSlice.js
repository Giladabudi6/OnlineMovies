import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Members Redux Slice */
const MEMBERS_URL = "http://localhost:4000/members";

export const FETCH_MEMBERS = createAsyncThunk(
  "members/FETCH_MEMBERS",
  async () => {
    const response = await axios.get(MEMBERS_URL);
    return response.data;
  }
);

export const ADD_MEMBER = createAsyncThunk(
  "members/ADD_MEMBER",
  async (newMember) => {
    const response = await axios.post(MEMBERS_URL, newMember);
    return response.data;
  }
);

export const UPDATE_MEMBER = createAsyncThunk(
  "members/UPDATE_MEMBER",
  async ({ memberId, updatedMember }) => {
    const response = await axios.put(
      `${MEMBERS_URL}/${memberId}`,
      updatedMember
    );
    return response.data;
  }
);

export const DELETE_MEMBER = createAsyncThunk(
  "members/DELETE_MEMBER",
  async (memberId) => {
    await axios.delete(`${MEMBERS_URL}/${memberId}`);
    return memberId;
  }
);

/* Members Slice Definition */
const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith("members/"),
      (state, action) => {
        switch (action.type) {
          case FETCH_MEMBERS.fulfilled.type:
            state.members = action.payload;
            break;
          case ADD_MEMBER.fulfilled.type:
            state.members.push(action.payload);
            break;
          case UPDATE_MEMBER.fulfilled.type:
            state.members = state.members.map((member) =>
              member._id === action.payload._id ? action.payload : member
            );
            break;
          case DELETE_MEMBER.fulfilled.type:
            state.members = state.members.filter(
              (member) => member._id !== action.payload
            );
            break;
          default:
            break;
        }
      }
    );
  },
});

export default membersSlice.reducer;