import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const getEnviromentVariable = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}

export const getMongoUri = () => {


    return isTest() ?
        // @ts-ignore
        `${global.__MONGO_URI__}${global.__MONGO_DB_NAME__}` : getEnviromentVariable('MONGO_URI');
}

export const isTest = () => {
    return getEnviromentVariable('NODE_ENV') === 'test';
}