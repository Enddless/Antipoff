import { createAPI } from "../services/api";
import { NameSpace } from "../const/const";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { usersSlice } from "./users";


export const api = createAPI();

export const reducer = combineReducers({
  [NameSpace.Auth]: authSlice.reducer,
  [NameSpace.Users]: usersSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
