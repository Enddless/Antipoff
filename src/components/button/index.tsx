import css from "./styles.module.scss";
import classNames from "classnames";
import sprite from "../../assets/sprite.svg";

interface ButtonProps {
  text: string;
  cls?: string;
  onClick?: () => void;
  //   disabled?: boolean;
}

const Button = ({
  text,
  cls,
  //   children,
  onClick,
}: ButtonProps) => {
  const enterButton = cls === "btn-enter";
  const regButton = cls === "btn-reg";
  const moreButton = cls === "btn-more";

  const classNamesList = classNames(css.btn, {
    [css.btnEnter]: enterButton,
    [css.btnReg]: regButton,
    [css.btnMore]: moreButton,
  });

  return (
    <button
      className={classNamesList}
      onClick={onClick}
      //   disabled={disabled}
    >
      {text}
      {moreButton && (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <use xlinkHref={`${sprite}#more`}></use>
        </svg>
      )}
    </button>
  );
};

export default Button;
