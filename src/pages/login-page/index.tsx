import Login from "../../components/form-login";
import css from "./styles.module.scss";

function LoginPage() {
  return (
    <div className={css.wrapper}>
      <Login />
    </div>
  );
}

export default LoginPage;
