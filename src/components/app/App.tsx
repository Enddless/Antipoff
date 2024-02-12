import { Route, Routes } from "react-router-dom";
import MainPage from "../../pages/main-page";
import { AppRoute } from "../../const/const";
import LoginPage from "../../pages/login-page";
import UserDetail from "../user-detail";
import { useAppDispatch } from "../../services/type";
import { useEffect } from "react";
import { authSlice } from "../../store/auth";
import Registration from "../form-registration";


function App() {
  const dispatch = useAppDispatch();
  const isToken = localStorage.getItem("tokenAntipoff");
  useEffect(() => {
    if (isToken) {
      dispatch(authSlice.actions.updateAuthUser());
    }
  }, [dispatch, isToken]);
  return (
    <div>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Authorisation} element={<LoginPage />} />
        <Route path={AppRoute.Registration} element={<Registration />} />
        <Route path={`${AppRoute.UserDetail}/:id`} element={<UserDetail />} />
      </Routes>
    </div>
  );
}

export default App;
