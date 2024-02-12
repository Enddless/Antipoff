import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus, LoadingStatus, NameSpace } from "../const/const";
import { login, registration } from "./thunk/authThunk";
import { StateAuth } from "../types/sliceTypes";

const initialState: StateAuth = {
  authStatus: AuthorizationStatus.Unknown,
  isRegistrationLoading: LoadingStatus.Idle,
  isLoginLoading: LoadingStatus.Idle,
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {
    updateAuthLogout: (state) => {
      state.authStatus = AuthorizationStatus.NoAuth;
    },
    updateAuthUser: (state) => {
      state.authStatus = AuthorizationStatus.Auth;
    },
  },
  extraReducers(builder) {
    builder
      // ***** registration *****
      .addCase(registration.pending, (state) => {
        state.isRegistrationLoading = LoadingStatus.Pending;
      })
      .addCase(registration.fulfilled, (state) => {
        state.isRegistrationLoading = LoadingStatus.Fulfilled;
      })
      .addCase(registration.rejected, (state) => {
        state.isRegistrationLoading = LoadingStatus.Rejected;
      })
      // ***** login *****
      .addCase(login.pending, (state) => {
        state.isLoginLoading = LoadingStatus.Pending;
        state.authStatus = AuthorizationStatus.Unknown;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoginLoading = LoadingStatus.Fulfilled;
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(login.rejected, (state) => {
        state.isLoginLoading = LoadingStatus.Rejected;
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const { updateAuthLogout } = authSlice.actions;
