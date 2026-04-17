import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv  from "dotenv";
import gymRoutes from './routes/gymRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/gym", gymRoutes);


app.get("/", (req,res)=>{
    res.send("Server is running")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB is Connected");
app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
    
}) .catch((error) => {
    console.log("Database connection error:", error.message);
  });
