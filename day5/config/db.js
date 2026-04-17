// import mongoose from "mongoose";

import mongoose from "mongoose"




export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connected")
    } catch (error) {
        console.log(error.message);
        
    }
}