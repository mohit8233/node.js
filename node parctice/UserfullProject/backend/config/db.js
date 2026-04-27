import mongoose from "mongoose"

export const connectDb = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URL)
     console.log("Mongoose Connected");
     
  } catch (error) {
    console.log(error.message);
    
  }
}