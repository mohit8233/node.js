import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required: true
    },
    department:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})

export const Employee = mongoose.model("Employee", employeeSchema)