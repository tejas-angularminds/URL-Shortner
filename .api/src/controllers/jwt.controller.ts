import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const generateJwt = (id: string) => {
    const token = jwt.sign( id, JWT_SECRET);
    return token;
}