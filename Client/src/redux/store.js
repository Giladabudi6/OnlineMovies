import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./tabSlice";
import usersReducer from "./usersSlice";
import moviesReducer from "./moviesSlice";
import membersReducer from "./membersSlice";
import subscriptionsReducer from "./subscriptionsSlice";
import { moviesSearchReducer } from "./searchSlice";
import { membersSearchReducer } from "./searchSlice";

/* Redux Store Configuration */
const store = configureStore({
  reducer: {
    tab: tabReducer,
    users: usersReducer,
    movies: moviesReducer,
    members: membersReducer,
    subscriptions: subscriptionsReducer,
    moviesSearch: moviesSearchReducer,
    membersSearch: membersSearchReducer,
  },
});

export default store;