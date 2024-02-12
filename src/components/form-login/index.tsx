import { useEffect, useState } from "react";
import Button from "../button";
import EyeIcon from "../eye-icon";
import css from "./styles.module.scss";
import { useAppDispatch } from "../../services/type";
import { login } from "../../store/thunk/authThunk";
import { AppRoute } from "../../const/const";
import { Link, useNavigate } from "react-router-dom";
import { validMail, validPassword } from "../../services/validate";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [formData, setFormData] = useState({
    usname: "",
    email: "eve.holt@reqres.in",
    password: "",
  });
  const handleChange = (e: { target: { name: string; value: string } }) => {
    setErrorMail("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //сообщение ошибки, если не заполнена почта
  useEffect(() => {
    const isValidateMail = validMail(formData.email);
    const isValidatePassword = validPassword(formData.password);
    if (!isValidateMail && formData.email !== "") {
      setErrorMail("Введите корректный email");
    } else {
      setErrorMail("");
    }
    if (!isValidatePassword && formData.password !== "") {
      setErrorPassword("Введите корректный пароль");
    }
    else {
      setErrorPassword("");
    }
    if (isValidateMail && isValidatePassword) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [formData]);

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
          <g>
            <path
              d="M13.5 0.5L0.5 13.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M0.5 0.5L13.5 13.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
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
            className={errorMail && errorMail !== "" ? `${css.errorInput}` : ""}
          />
          {errorMail && errorMail !== "" && (
            <span className={css.errorMessage}>{errorMail}</span>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="password">Пароль</label>
          <input
            value={formData.password}
            onChange={handleChange}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className={errorPassword && errorPassword !== "" ? `${css.errorInput}` : ""}
          />
          <div className={css.eyeIcon}>
            <EyeIcon
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
            />
          </div>
          {errorPassword && errorPassword !== "" && (
            <span className={css.errorMessage}>{errorPassword}</span>
          )}
        </fieldset>
      </fieldset>
      <div className={css.btnContainer}>
        <Link to={AppRoute.Registration}>
          <p>Еще не зарегистрированы?</p>
        </Link>
      </div>
      <div className={css.btnContainer}>
        <Button text="Войти" cls="btn-reg" disabled={!isValidForm}/>
      </div>
    </form>
  );
}

export default Login;
