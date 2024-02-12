import { Link } from "react-router-dom";
import Button from "../button";
import css from "./styles.module.scss";
import { AppRoute, AuthorizationStatus } from "../../const/const";
import { useAppDispatch, useAppSelector } from "../../services/type";
import { Users } from "../../types/sliceTypes";
import { logout } from "../../store/thunk/usersThunk";
import { authSlice } from "../../store/auth";
import sprite from "../../assets/sprite.svg";

type TContentProps = {
  data?: Users;
};
function Header({ data }: TContentProps) {
  const dispatch = useAppDispatch();
  const authorisation = useAppSelector((state) => state.auth.authStatus);
  const logoutClick = () => {
    dispatch(logout());
    dispatch(authSlice.actions.updateAuthLogout());
  };
  return (
    <header className={css.header}>
      <div className={css.content}>
        {!data ? (
          <>
            <h1 className={css.title}>Наша команда</h1>
            <h2 className={css.subtitle}>
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.
            </h2>
          </>
        ) : (
          <>
            <Link to={AppRoute.Root} className={css.backButton}>
              <Button text="Назад" cls="btn-enter" />
            </Link>
            <Link to={AppRoute.Root} className={css.backIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <use href={`${sprite}#arrowBack`}></use>
              </svg>
            </Link>

            <div className={css.user}>
              <div className={css.photoContainer}>
                <div className={css.photoItem}>
                  <div className={css.photoBody}>
                    <img src={data.avatar} alt="user photo" />
                  </div>
                </div>
              </div>
            </div>

            <div className={css.userInfo}>
              <h1>{`${data.first_name} ${data.last_name}`}</h1>
              <p className={css.cpecialithy}>Партнер</p>
            </div>
          </>
        )}
        <div className={css.buttonContainer}>
          {authorisation === AuthorizationStatus.Auth ? (
            <Link to={AppRoute.Root}>
              <Button text="Выход" cls="btn-enter" onClick={logoutClick} />
            </Link>
          ) : (
            <Link to={AppRoute.Authorisation}>
              <Button text="Вход" cls="btn-enter" />
            </Link>
          )}
        </div>

        <div className={css.logout}>
          {authorisation === AuthorizationStatus.Auth ? (
            <Link to={AppRoute.Root}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                onClick={logoutClick}
              >
                <use href={`${sprite}#logout`}></use>
              </svg>
            </Link>
          ) : (
            <Link to={AppRoute.Authorisation}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <use href={`${sprite}#logout`}></use>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
