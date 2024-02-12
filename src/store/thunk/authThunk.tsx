import { createAsyncThunk } from "@reduxjs/toolkit";
import { Extra } from "../../services/type";
import { APIRoute } from "../../const/const";
import { AuthData, ReturnDataAuth } from "../../types/sliceTypes";
import { addToken } from "../../services/token";

// ********** AUTH **********
export const registration = createAsyncThunk<ReturnDataAuth, AuthData, Extra>(
  "user/registration",
  async ({ emailUser, password }, { extra: api }) => {
    const response = await api.post<ReturnDataAuth>(APIRoute.Registration, {
      email: emailUser,
      password: password,
    });
    const token = response.data.token;
    addToken({ token });
    return response.data;
  }
);

export const login = createAsyncThunk<string, AuthData, Extra>(
  "user/login",
  async ({ emailUser, password }, { extra: api }) => {
    const response = await api.post(APIRoute.Login, {
      email: emailUser,
      password: password,
    });

    const token = response.data.token;
    addToken({ token });
    return response.data;
  }
);