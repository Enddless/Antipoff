import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/type";
import css from "./styles.module.scss";
import { getUsers } from "../../store/thunk/usersThunk";
import Button from "../button";
import sprite from "../../assets/sprite.svg";
import { Link } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const/const";
import classNames from "classnames";
import { Users } from "../../types/sliceTypes";

function MainContent() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users.usersData)?.data;
  const [more, setMore] = useState(1);

  const authStatus = useAppSelector((state) => state.auth.authStatus);
  const [auth, setAuth] = useState(authStatus);

  useEffect(() => {
    setAuth(authStatus);
  }, [authStatus]);

  const [localFavorit, setlocalFavorit] = useState(
    localStorage.getItem("favorUsers")
  );
  const [favoritesData, setFavoritesData] = useState(
    localFavorit ? JSON.parse(localFavorit) : []
  );

  useEffect(() => {
    if (localFavorit) {
      setFavoritesData(JSON.parse(localFavorit));
    }
  }, [localFavorit]);

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


  const handleFavoriteClick = (userId: string) => {
    const index = favoritesData.findIndex(
      (user: Users) => user.email === userId
    );

    if (index !== -1) {
      favoritesData.splice(index, 1);
    } else {
      const userToAdd = (usersState || []).find(
        (user) => user.email === userId
      );
      if (userToAdd) {
        favoritesData.push(userToAdd);
      }
    }

    // Вызываем функцию setFavoritesData для обновления состояния
    setFavoritesData(favoritesData);

    // Сохраняем обновленный массив favoritesData в localStorage
    localStorage.setItem("favorUsers", JSON.stringify(favoritesData));
    setlocalFavorit(JSON.stringify(favoritesData));
  };

  return (
    <>
      {auth === AuthorizationStatus.Auth && (
        <>
          <div className={css.wrapper}>
            {usersState?.map((user) => {
              const isFavorite = favoritesData.length > 0 && favoritesData.find((item: Users) => item.email === user.email);
              const classNameList = classNames(css.primary, {
                [css.favor]: isFavorite,
              });

              return (
                <div className={css.card} key={user.email}>
                  <Link to={`${AppRoute.UserDetail}/${user.id}`}>
                    <img src={user.avatar} />
                    <h2>{`${user.first_name} ${user.last_name}`}</h2>
                  </Link>
                  <div
                    className={css.decoration}
                    onClick={() => handleFavoriteClick(user.email)}
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
            <Button
              text={more == 2 ? "Больше нет" : "Показать еще"}
              cls="btn-more"
              onClick={clickMore}
            />
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
