import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './config/db';
import { studentRouter } from './routes/studentRoutes';

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

await connectDb()


app.use("/api/student", studentRouter)
 