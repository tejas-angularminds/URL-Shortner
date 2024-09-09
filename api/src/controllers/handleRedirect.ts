import express from 'express';
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';
import Status from '../utils/statusCode';
import { POOL } from '../config';

export const handleRedirectUrl = async (req: express.Request, res: express.Response) => { 

    const prisma = new PrismaClient({
        datasourceUrl: POOL,
    }).$extends(withAccelerate());

    try{
        const urlExists = await prisma.urls.findFirst({
            where: {
                id: req.params.id
            }
        });
        if(!urlExists){
            return res.status(Status.NotFound).json({
                message: 'URL Not found!!'
            });
        }

        return res.status(Status.MovedPermanently).redirect(urlExists.longUrl)

    } catch(error) {
        return res.status(Status.Gone).json({
            message: "Url expired"
        });
    } finally {
        await prisma.$disconnect();
    }
} 