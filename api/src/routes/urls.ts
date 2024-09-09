import express from 'express';
import { PrismaClient } from "@prisma/client";

export const urlsRouter = express.Router();

urlsRouter.get('/url',(req,res) => {
    res.json({
        message: 'Url working'
    })
}); // delete