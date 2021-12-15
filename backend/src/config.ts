import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    RIOT_API_KEY: process.env.API_TOKEN,
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'summonersdb',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASS: process.env.MONGO_PASS || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost'
}