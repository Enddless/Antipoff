export const validMail = (email: string) => {
  const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (reg.test(email) && email.length !== 0) {
    return true;
  } else {
    return false;
  }
};

export const validPassword = (password: string) => {
  const reg = /^.{6,}$/;

  if (reg.test(password) &&  password.length !== 0) {
    return true;
  } else {
    return false;
  }
};
