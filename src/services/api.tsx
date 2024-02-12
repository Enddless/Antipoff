import axios from "axios";
import { getToken } from "./token";

export const API_URL = "https://reqres.in/api/";
export const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    responseType: "json",
    headers: {
      Accept: "*",
      "Content-Type": "application/json",
    },
  });
  // Перехватчик для обработки исходящих запросов
  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }

    return config;
  });

  return api;
};
