import express from 'express';
import { urlsRouter } from './urls';
import { userRouter } from './users';

export const rootRouter = express.Router();

rootRouter.use('/users',userRouter);
rootRouter.use('/urls',urlsRouter);
