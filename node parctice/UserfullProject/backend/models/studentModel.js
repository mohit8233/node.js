import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,

   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   age: {
      type: Number,
      required: true,
   },
   department: {
      type: String,
      required: true,

   },
   salary: {
      type: Number,
      required: true,
   }



})

export const User = mongoose.model("User", userSchema)