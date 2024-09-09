import { JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken';
import express , {RequestHandler} from 'express'
import Status from "../utils/statusCode";

interface myJwtPayload extends jwt.JwtPayload{
    userId : string
}

export const authMiddleware: RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(Status.Unauthorized).json({
                message: "Unauthorized! "
            })
        }

        const token: string = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET) as myJwtPayload;

        if(decoded.userId){
            req.body.userId = decoded.userId;
            next();
        } else {
            return res.status(Status.Unauthorized).json({
                message: "Unauthorized!!!"
            });
        }
    } catch(error){
        return res.status(Status.BadRequest).json({
            error: error
        });
    }
}