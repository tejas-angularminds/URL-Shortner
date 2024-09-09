import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const generateJwt = (id: string) => {
    
    const token = jwt.sign({userId: id} , JWT_SECRET);
    return token;
}