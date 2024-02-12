import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type IVisibilityPassProps = {
    togglePasswordVisibility?: () => void;
    showPassword: boolean;
  };


function EyeIcon({togglePasswordVisibility, showPassword}:IVisibilityPassProps) {
  return (
    <FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
      onClick={togglePasswordVisibility}
    />
  );
}

export default EyeIcon;
