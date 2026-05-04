import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { Routes } from "./routes/categoriesRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDb();


//=============Routes=============//

app.use("/api/v1", Routes)

// ================= SERVER =================
const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});