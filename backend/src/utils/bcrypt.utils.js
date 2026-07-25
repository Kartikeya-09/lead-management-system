import bcrypt from 'bcryptjs';

const hashPassword = async (plain) => {
  return bcrypt.hash(plain, 12);
};

const comparePassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

export {
  hashPassword,
  comparePassword,
};
