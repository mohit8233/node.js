import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js"


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mongo connected"))
.catch(err => console.log(err))


app.listen(process.env.PORT,()=>{
    console.log("Server running on port", process.env.PORT);
    
})