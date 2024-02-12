import { useState } from "react";
import Button from "../button";
import EyeIcon from "../eye-icon";
import css from "./styles.module.scss";
import { useAppDispatch } from "../../services/type";
import { login } from "../../store/thunk/authThunk";
import { AppRoute } from "../../const/const";
import { Link, useNavigate } from "react-router-dom";
import sprite from "../../assets/sprite.svg";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usname: "",
    email: "eve.holt@reqres.in",
    password: "pistol",
    dublPassword: "pistol",
  });
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //регистрация пользователя
  const dispatch = useAppDispatch();
  //   const [successForm, setSuccessForm] = useState(false);
  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    const emailUser = formData.email;
    const password = formData.password;
    const data = {
      emailUser,
      password,
    };
    dispatch(login(data))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Root);
      });
  };

  return (
    <form className={css.authForm} onSubmit={handleSubmit}>
      <Link to={AppRoute.Root} className={css.closeContainer}>
        <svg width="14" height="14" viewBox="0 0 14 14">
          <use xlinkHref={`${sprite}#close`}></use>
        </svg>
      </Link>
      <fieldset>
        <h2 className={css.title}>Войти</h2>
        <fieldset>
          <label htmlFor="email">Электронная почта</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.ru"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Пароль</label>
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
          />
          <div className={css.eyeIcon}>
            <EyeIcon
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
          </div>
        </fieldset>
      </fieldset>
      <div className={css.btnContainer}>
        <Link to={AppRoute.Registration}>
          <p>Еще не зарегистрированы?</p>
        </Link>
      </div>
      <div className={css.btnContainer}>
        <Button text="Войти" cls="btn-reg" />
      </div>
    </form>
  );
}

export default Login;
