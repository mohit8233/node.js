import mongoose from "mongoose";

const userSchme = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})

export const User = mongoose.model("users", userSchme)