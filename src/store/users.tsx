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
    toggleFavorite: (state, action) => {
      const userId = action.payload;
      const index = state.favorites.findIndex((user) => user.id === userId);
      if (index !== -1) {
        // если user уже есть в избранном, то удаляем его
        state.favorites.splice(index, 1);
        localStorage.setItem("favorUsers", JSON.stringify(state.favorites));
      } else {
        // если user нет в избранном, то добавляем его
        const userToAdd = (state.usersData?.data || []).find(
          (user) => user.id === userId
        );
        if (userToAdd) {
          state.favorites.push(userToAdd);
          localStorage.setItem("favorUsers", JSON.stringify(state.favorites));
        }
      }
    },
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
export const { toggleFavorite } = usersSlice.actions;
