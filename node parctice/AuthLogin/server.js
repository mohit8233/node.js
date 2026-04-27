import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRoutes.js';
dotenv.config();

await connectDb()

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth",authRouter)
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    
})