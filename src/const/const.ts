export enum NameSpace {
  Users = "users",
  Auth = "auth",
}
export const enum LoadingStatus {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}
export const enum AuthorizationStatus {
  Auth = "AUTH",
  NoAuth = "NO_AUTH",
  Unknown = "UNKNOWN",
}

export const AUTH_TOKEN_NAME = "tokenAntipoff";

export enum APIRoute {
  //auth
  Registration = "register",
  Login = "login",
  Users = "users"
}

export enum AppRoute {
  Root = "/",
  Authorisation = "/authorisation",
  Registration = "/registration",
  Login = "/login",
  UserDetail = "/user-detail",
  NotFound = "/*",
}

