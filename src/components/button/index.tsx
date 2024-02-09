import css from "./styles.module.scss";
import classNames from "classnames";

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

  const classNamesList = classNames(css.btn, {
    [css.btnEnter]: enterButton,
  });

  return (
    <button
      className={classNamesList}
      onClick={onClick}
      //   disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
