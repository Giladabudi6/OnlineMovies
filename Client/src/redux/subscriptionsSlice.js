/* eslint-disable no-case-declarations */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Subscriptions Redux Slice */
const SUBSCRIPTIONS_URL = "http://localhost:4000/subscriptions";

export const FETCH_SUBSCRIPTIONS = createAsyncThunk(
  "subscriptions/FETCH_SUBSCRIPTIONS",
  async () => {
    const response = await axios.get(SUBSCRIPTIONS_URL);
    return response.data;
  }
);

export const ADD_SUBSCRIPTION = createAsyncThunk(
  "subscriptions/ADD_SUBSCRIPTION",
  async (newSubscription) => {
    const response = await axios.post(SUBSCRIPTIONS_URL, newSubscription);
    return response.data;
  }
);

export const UPDATE_SUBSCRIPTION = createAsyncThunk(
  "subscriptions/UPDATE_SUBSCRIPTION",
  async ({ subscriptionId, updatedSubscription }) => {
    const response = await axios.put(
      `${SUBSCRIPTIONS_URL}/${subscriptionId}`,
      updatedSubscription
    );
    return response.data;
  }
);

export const DELETE_SUBSCRIPTION = createAsyncThunk(
  "subscriptions/DELETE_SUBSCRIPTION",
  async (subscriptionId) => {
    await axios.delete(`${SUBSCRIPTIONS_URL}/${subscriptionId}`);
    return subscriptionId;
  }
);

/* Subscriptions Slice Definition */
const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    subscriptions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith("subscriptions/"),
      (state, action) => {
        switch (action.type) {
          case FETCH_SUBSCRIPTIONS.fulfilled.type:
            state.subscriptions = action.payload;
            break;
          case ADD_SUBSCRIPTION.fulfilled.type:
            state.subscriptions.push(action.payload);
            break;
          case UPDATE_SUBSCRIPTION.fulfilled.type:
            const index = state.subscriptions.findIndex(
              (sub) => sub._id === action.payload._id
            );
            if (index !== -1) {
              state.subscriptions[index] = action.payload;
            }
            break;
          case DELETE_SUBSCRIPTION.fulfilled.type:
            state.subscriptions = state.subscriptions.filter(
              (sub) => sub._id !== action.payload
            );
            break;
          default:
            break;
        }
      }
    );
  },
});

export default subscriptionsSlice.reducer;