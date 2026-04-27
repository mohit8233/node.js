import express from 'express'
import { connectDb } from './config/db.js';

import cors from 'cors'
import { employeeRouter } from './routes/employeeRoutes.js';
import { userRouter } from './routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

await connectDb();

app.use("/api/employees" ,employeeRouter)
app.use("/api/authRoutes", userRouter)
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})