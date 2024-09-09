import express from 'express';
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import Status from '../utils/statusCode';
import { POOL } from '../config';


export const handleGetUser = async (req: express.Request, res: express.Response) => {
    const prisma = new PrismaClient({
        datasourceUrl: POOL,
    }).$extends(withAccelerate());

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: req.body.userId
            }
        });
        if(!user){
            throw new Error("User Not Found!")
        }
        
        return res.status(Status.Success).json({
            message: "User Found!",
            userName: user.userName
        });
    } catch(error){
        return res.status(Status.NotFound).json({
            error: error
        });
    } finally {
        await prisma.$disconnect();
    }
}