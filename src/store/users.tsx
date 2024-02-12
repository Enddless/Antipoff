import { createSlice } from "@reduxjs/toolkit";
import { LoadingStatus, NameSpace } from "../const/const";
import { StateUsers } from "../types/sliceTypes";
import { getUsers, logout } from "./thunk/usersThunk";

const initialState: StateUsers = {
  isUsersLoading: LoadingStatus.Idle,
  usersData: undefined,
  favorites: [],
};

export const usersSlice = createSlice({
  name: NameSpace.Users,
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      // ***** get users *****
      .addCase(getUsers.pending, (state) => {
        state.isUsersLoading = LoadingStatus.Pending;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isUsersLoading = LoadingStatus.Fulfilled;
        state.usersData = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUsersLoading = LoadingStatus.Rejected;
      })
      // ***** logout *****
      .addCase(logout.fulfilled, (state) => {
        state.usersData = undefined;
      });
  },
});

