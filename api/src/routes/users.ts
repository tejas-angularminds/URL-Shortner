import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { handleSignup } from '../controllers/handleSignup';
import { handleSignin } from '../controllers/handleSignin';
import { handleGetUser } from '../controllers/getUser';
import { getAllUrls } from '../controllers/getAllUrl';

export const userRouter = express.Router();

userRouter.post('/signup', handleSignup); 

userRouter.post('/signin', handleSignin);

userRouter.get('/user', authMiddleware, handleGetUser);

userRouter.get('/urls', authMiddleware, getAllUrls);