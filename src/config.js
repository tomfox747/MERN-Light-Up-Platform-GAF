import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME,
    SUPER_USER_PASSWORD: process.env.SUPER_USER_PASSWORD,
    JWT_TOKEN_DETAILS: process.env.JWT_TOKEN_DETAILS,
    JWT_TOKEN: process.env.JWT_TOKEN
};

export default config;