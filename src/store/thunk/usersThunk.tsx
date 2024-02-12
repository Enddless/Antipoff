import { createAsyncThunk } from "@reduxjs/toolkit";
import { Extra } from "../../services/type";
import { APIRoute } from "../../const/const";
import { ReturnDataUsers } from "../../types/sliceTypes";
import { deleteToken } from "../../services/token";

// ********** get all users **********
export const getUsers = createAsyncThunk<ReturnDataUsers, number, Extra>(
  "users/getUsers",
  async (more, { extra: api }) => {
    const { data } = await api.get<ReturnDataUsers>(`${APIRoute.Users}?page=${more}`);

    return data;
  }
);

export const logout = createAsyncThunk<void, undefined, Extra>(
  "user/logout",
  async (_arg, { extra: api }) => {
    const { data } = await api.delete(APIRoute.Login);
    deleteToken();
    return data;
  }
);
