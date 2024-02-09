import Button from "../button";
import css from "./styles.module.scss";

function Header() {
  return (
    <header className={css.header}>
      <div className={css.content}>
        <h1 className={css.title}>Наша команда</h1>
        <h2 className={css.subtitle}>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </h2>
        <div className={css.buttonContainer}>
          <Button text="Вход" cls="btn-enter" />
        </div>
      </div>
    </header>
  );
}

export default Header;
