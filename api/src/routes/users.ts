import express from 'express';
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinBody, signupBody } from '../utils/userZodSchema';
import Status from '../utils/statusCode';
import { POOL } from '../config';
import bcrypt from 'bcrypt';
import { generateJwt } from '../controllers/jwt.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { handleSignup } from '../controllers/handleSignup';
import { handleSignin } from '../controllers/handleSignin';
import { handleGetUser } from '../controllers/getUser';

export const userRouter = express.Router();

userRouter.post('/signup', handleSignup); 

userRouter.post('/signin', handleSignin);

userRouter.get('/user', authMiddleware, handleGetUser);