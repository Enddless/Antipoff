import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/type";
import css from "./styles.module.scss";
import { getUsers } from "../../store/thunk/usersThunk";
import Button from "../button";
import sprite from "../../assets/sprite.svg";
import { Link } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const/const";
import { toggleFavorite } from "../../store/users";
import classNames from "classnames";
import { Users } from "../../types/sliceTypes";

function MainContent() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users.usersData)?.data; 
  const [more, setMore] = useState(1);
  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const [favoritesData, setFavoritesData] = useState(
    JSON.parse(localStorage.getItem("favorUsers") || "[]")
  );

  const [auth, setAuth] = useState(authStatus);
  useEffect(() => {
    setAuth(authStatus);
  }, [authStatus]);

  const clickMore = () => {
    if (more < 2) {
      setMore(more + 1);
    }
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(getUsers(more));
    }
  }, [dispatch, more, authStatus]);


  const handleFavoriteClick = (userId: number) => {
    dispatch(toggleFavorite(userId));
    setFavoritesData(JSON.parse(localStorage.getItem("favorUsers") || "[]"));
  };

  return (
    <>
      {auth === AuthorizationStatus.Auth && (
        <>
          <div className={css.wrapper}>
            {usersState?.map((user) => {
              const isFavorite =
                favoritesData.length > 0 &&
                favoritesData.find((item: Users) => item.id === user.id);
              const classNameList = classNames(css.primary, {
                [css.favor]: isFavorite,
              });

              return (
                <div className={css.card} key={user.id}>
                  <Link to={`${AppRoute.UserDetail}/${user.id}`}>
                    <img src={user.avatar} />
                    <p>{`${user.first_name} ${user.last_name}`}</p>
                  </Link>
                  <div
                    className={css.decoration}
                    onClick={() => handleFavoriteClick(user.id)}
                  >
                    <svg width="16" height="14" className={classNameList}>
                      <use xlinkHref={`${sprite}#heart`}></use>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={css.buttonContainer}>
            <Button text={more == 2 ? "Больше нет" : "Показать еще"} cls="btn-more" onClick={clickMore} />
          </div>
        </>
      )}
      {(auth === AuthorizationStatus.NoAuth ||
        auth === AuthorizationStatus.Unknown) && (
        <div className={css.atentionBlock}>
          <p>Чтобы увидеть пользователей необходимо зарегистрироваться</p>
        </div>
      )}
    </>
  );
}

export default MainContent;
