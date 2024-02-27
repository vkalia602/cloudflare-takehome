import { genSaltSync, hashSync, compare } from "bcrypt";
export function hashValue(password) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

export function isPasswordMatch(plainTextPassword, hashPassword) {
  const isMatch = compare(plainTextPassword, hashPassword)
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err.message));
  return isMatch;
}
