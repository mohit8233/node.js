import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        age:{
            type: Number,
             required: true
        },
         membership:{
            type: String,
             required: true
        },
         fees:{
            type: String,
             required: true
        }
    },
    {timestamps: true}
);

const gymModels = mongoose.model("gymmembers", gymSchema );

export default gymModels;