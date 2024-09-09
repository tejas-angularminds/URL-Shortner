import dotenv from 'dotenv';

dotenv.config();

export const POOL: string = process.env.ENV_POOL || "";
export const JWT_SECRET: string = process.env.ENV_JWT_SECRET || "";
