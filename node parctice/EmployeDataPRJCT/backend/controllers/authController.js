import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async(req,res)=>{
     let user;
    try {
        const {name, email, password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                status: false,
                message: "Payload Missing"
            })

        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                status: false,
                message: "User already register"
            })
        }
        const hashedPassword = await  bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            status: true,
            message: "User get registered",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in register User ${error.message}`
        })
    }
}

export const loginUser = async (req,res)=>{
   try {
      const {email, password} = req.body;

    if(!email||!password){
      return res.status(400).json({
         status: false,
                message: "Payload Missing"
      })
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
             status: false,
                message: "User not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
         return res.status(400).json({
             status: false,
                message: "Invalid password"
         })
    }
    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_TOKEN);
    return res.status(200).json({
        status: true,
        message: "User login Successfully",
        data:{isMatch,token}
    })

   } catch (error) {
     return res.json({
        status: false,
        message: `Error in login user ${error.message}`
     })
   }
}