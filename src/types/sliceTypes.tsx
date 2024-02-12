import { LoadingStatus } from "../const/const";

export type StateAuth = {
  authStatus: string;
  isRegistrationLoading: LoadingStatus;
  isLoginLoading: LoadingStatus;
};

export type AuthData = {
  emailUser: string;
  password: string;
};

export type ReturnDataAuth = {
  id: number;
  token: string;
};

export type StateUsers = {
  isUsersLoading: LoadingStatus;
  usersData: ReturnDataUsers | undefined;
  favorites: Users[];
};

export type ReturnDataUsers = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Users[] | null;
  support: {
    url: string;
    text: string;
  };
};
export type Users = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
