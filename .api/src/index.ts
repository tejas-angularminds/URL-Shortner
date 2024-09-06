import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { rootRouter } from './routes/index';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(port , () => {
    console.log(`URL backend listening on port: ${port}`);
})