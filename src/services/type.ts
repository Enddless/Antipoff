import { AxiosInstance } from "axios";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { store } from "../store";

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = useDispatch<AppDispatch>;

export type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};
