import express from 'express';
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';
import Status from '../utils/statusCode';
import { POOL } from '../config';

export const getAllUrls = async (req: express.Request, res: express.Response) => {
    const prisma = new PrismaClient({
        datasourceUrl: POOL,
    }).$extends(withAccelerate());

    try {
        if(!req.body.userId){
            return res.status(Status.Forbidden).json({
                message: "User Id not found!"
            });
        }

        const userUrls = await prisma.urls.findMany({
            where: {
                authorId: req.body.userId
            }
        });

        if(!userUrls){
            return res.status(Status.NotFound).json({
                message: 'Url Not Found!!'
            });
        }

        return res.status(Status.Success).json({
            message: "All urls of the user",
            urls : userUrls
        });

    } catch(error) {
        return res.status(Status.Gone).json({
            
        });
    } finally {
        await prisma.$disconnect();
    }
}