import mongoose from "mongoose";
import { Category } from "./categoryModel.js";


const  productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    CategoryID:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Category"
    }

},{timestamps:true})


export const Product = mongoose.model("Product", productSchema)