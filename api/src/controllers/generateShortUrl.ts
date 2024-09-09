import { nanoid } from "nanoid";
import express from 'express';
import { urlBody } from '../utils/urlZodSchema';
import Status from "../utils/statusCode";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';
import { POOL } from '../config';


export const handleGenerateNewShorturl = async (req: express.Request, res: express.Response) => {
    const { success } = urlBody.safeParse(req.body);
    if (!success) {
        return res.status(Status.Forbidden).json({
            error: "Url is required in Payload!"
        });
    }

    const prisma = new PrismaClient({
        datasourceUrl: POOL,
    }).$extends(withAccelerate());

    try{
        const shortId = nanoid(7);
        if(!req.body.userId){
            return res.status(Status.Forbidden).json({
                error: "User is not Logged In!"
            });
        }

        const urlExists = await prisma.urls.findFirst({
            where: {
                longUrl :  req.body.orignalUrl,
            }
        });

        if(urlExists?.shortUrl){
            return res.status(Status.Success).json({
                message: "Url already exists!",
                shortUrl: urlExists.shortUrl
            });
        }

        // Get the base URL from the request's origin
        const baseUrl = req.get('origin') || 'http://localhost:3000'; // Fallback URL for local development

        // Generate the full short URL
        const shortURL = `${baseUrl}/${shortId}`;

        const url = await prisma.urls.create({
            data: {
                id: shortId,
                longUrl: req.body.orignalUrl,
                authorId: req.body.userId,
                shortUrl: shortURL,
                creationDate: new Date()
            }
        });

        return res.status(Status.Success).json({
            shortURL : url.shortUrl,
            id: url.id,
            orignalURL : url.longUrl,
            messsage: "URL Created Succesfully!!"
        });

    } catch(error){
        return res.status(Status.BadRequest).json({
            error: error
        });
    } finally{
        await prisma.$disconnect();
    }
}