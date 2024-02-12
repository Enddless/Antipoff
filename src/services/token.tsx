import { AUTH_TOKEN_NAME } from "../const/const";

export type Token = {
  token: string;
};
export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return token ? {token} :  { token: ""};
};

export const addToken = ({ token  }: Token): void => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const deleteToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};
