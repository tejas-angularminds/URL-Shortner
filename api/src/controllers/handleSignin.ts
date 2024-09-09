import express from 'express';
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinBody } from '../utils/userZodSchema';
import Status from '../utils/statusCode';
import { POOL } from '../config';
import bcrypt from 'bcrypt';
import { generateJwt } from '../controllers/jwt.controller';

export const handleSignin = async (req: express.Request, res: express.Response) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(Status.Forbidden).json({
            message: "Incorrect Inputs please check the Payload!"
        });
    }
    
    // Creating prisma client with connection pool.
    const prisma = new PrismaClient({
        datasourceUrl: POOL,
    }).$extends(withAccelerate());

    try{
        // Checking if user exists:
        const userExist = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if(!userExist){
            return res.status(Status.Conflict).json({
                message: "User does not exists!"
            });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userExist.password);
        if (!passwordMatch) {
            return res.status(Status.Unauthorized).json({
                message: "Incorrect Password!"
            });
        }

        //Get JWT
        const token = generateJwt(userExist.id);
        if(!token){
            throw new Error("Not able to generate Token!")
        } else{
            return res.status(Status.Success).json({
                message: `Successfully Logged In!`,
                token : `Bearer ${token}`
            })
        }
    } catch(error){
        return res.status(Status.BadRequest).json({
            message: "Internal Server Error: " + error
        });
    } finally {
        await prisma.$disconnect();
    }
}