import dotenv from 'dotenv';
dotenv.config();

const getEnviromentVariable = (name: string) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}

export const getMongoUri = () => {
    return getEnviromentVariable('MONGO_TEST_URI');
}