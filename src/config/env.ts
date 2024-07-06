import 'dotenv/config';

export const server = {
  port: +process.env.PORT,
};

export const security = {
  bcrypt: {
    saltOrRounds: +process.env.BCRYPT_SALT,
  },
};
