import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req,res)=>{
    let user;
    try {
        const {name,email,password} = req.body;
        if (!name||!email||!password) {
            return res.status(400).json({
                status:false,
                message: "All feilds are required"
            })
            
        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(409).json({
                status:false,
                message:"User already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
            status: true,
            message: "User register successfully",
            data:user
        })

    } catch (error) {
        return res.status(400).json({
            status:false,
            message:`Error in register ${error.message}`
        })
    }
}

export const login = async(req,res)=>{
    try {
         const {email,password} = req.body;
         if (!email||!password) {
            return res.json({
                status: false,
                message: "Payload Missing"
            })
         }

         const user  = await User.findOne({email});
         if(!user){
             return res.json({
                status: false,
                message: "user not found"
            })
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
              return res.json({
                status: false,
                message: "Invalid password"
            })
         }
         
         const token = await jwt.sign({id:user._id,email: user.email}, process.env.JWT_SECRET_KEY,{expiresIn:"10m"})
         return res.status(200).json({
            status: true,
            message: "user logined",
            data: token
         })
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:`Error in login ${error.message}`
        })
    }
} 