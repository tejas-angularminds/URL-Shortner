import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { handleGenerateNewShorturl } from '../controllers/generateShortUrl';

export const urlsRouter = express.Router();

urlsRouter.post('/', authMiddleware, handleGenerateNewShorturl);

