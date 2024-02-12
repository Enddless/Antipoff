import { useEffect, useState } from "react";
import Button from "../button";
import EyeIcon from "../eye-icon";
import css from "./styles.module.scss";
import { useAppDispatch } from "../../services/type";
import { login, registration } from "../../store/thunk/authThunk";
import { AppRoute } from "../../const/const";
import { Link, useNavigate } from "react-router-dom";
import { validMail, validPassword } from "../../services/validate";

function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showDoublePassword, setShowDoublePassword] = useState(false);
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorName, setErrorName] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [formData, setFormData] = useState({
    usname: "",
    email: "eve.holt@reqres.in",
    password: "",
    dublPassword: "",
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
    dispatch(registration(data))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Root);
      })
      .then(() => dispatch(login(data)));
  };

  //сообщение ошибки, если не заполнена почта
  useEffect(() => {
    const isValidateMail = validMail(formData.email);
    const isValidatePassword = validPassword(formData.password);
    if (formData.usname !=="" && formData.usname.length < 6) {
      setErrorName("Минимум из 6 знаков");
    } else {
      setErrorName("");
    }
    if (!isValidateMail && formData.email !== "") {
      setErrorMail("Введите корректный email");
    } else {
      setErrorMail("");
    }
    if (!isValidatePassword && formData.password !== "") {
      setErrorPassword("Введите корректный пароль");
    } else {
      setErrorPassword("");
    }
    if (formData.password !== formData.dublPassword) {
      setErrorPassword("Пароли должны совпадать");
    } else {
      setErrorPassword("");
    }
    if (isValidateMail && isValidatePassword && formData.usname.length >= 6) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [formData]);

  return (
    <div className={css.wrapper}>
      <form className={css.regForm} onSubmit={handleSubmit}>
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
          <h2 className={css.title}>Регистрация</h2>
          <fieldset>
            <label htmlFor="usname">Имя</label>
            <input
              type="text"
              value={formData.usname}
              name="usname"
              id="usname"
              onChange={handleChange}
              placeholder="Введите имя"
              className={
                errorName && errorName !== "" ? `${css.errorInput}` : ""
              }
            />
            {errorName && errorName !== "" && (
              <span className={css.errorMessage}>{errorName}</span>
            )}
          </fieldset>
          <fieldset>
            <label htmlFor="email">Электронная почта</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.ru"
              className={
                errorMail && errorMail !== "" ? `${css.errorInput}` : ""
              }
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
              className={
                errorPassword && errorPassword !== "" ? `${css.errorInput}` : ""
              }
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

          <fieldset>
            <label htmlFor="dublPassword">Повторите пароль</label>
            <input
              value={formData.dublPassword}
              onChange={handleChange}
              name="dublPassword"
              type={showDoublePassword ? "text" : "password"}
              placeholder="********"
              className={
                errorPassword && errorPassword !== "" ? `${css.errorInput}` : ""
              }
            />
            <div className={css.eyeIcon}>
              <EyeIcon
                showPassword={showDoublePassword}
                togglePasswordVisibility={() =>
                  setShowDoublePassword(!showDoublePassword)
                }
              />
            </div>
          </fieldset>
        </fieldset>
        <div className={css.btnContainer}>
          <Button
            text="Зарегистрироваться"
            cls="btn-reg"
            disabled={!isValidForm}
          />
        </div>
      </form>
    </div>
  );
}

export default Registration;
