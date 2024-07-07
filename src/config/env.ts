import 'dotenv/config';

export const server = {
  port: +process.env.PORT,
};

export const security = {
  bcrypt: {
    saltOrRounds: +process.env.BCRYPT_SALT,
  },
};

export const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  isGlobal: true,
};
