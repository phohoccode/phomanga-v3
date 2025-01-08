import bcrypt from "bcrypt";


const hashUserPassword = (password: string, salt: string) => {
  return bcrypt.hashSync(password, salt);
};

const checkPassword = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

const genarateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

export { hashUserPassword, checkPassword, genarateOTP };
