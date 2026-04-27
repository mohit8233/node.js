import { User } from "../models/model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




export const registerUser = async (req,res)=>{
   let user;
    try {
      const {name, email, password} = req.body;
      if(!name||!email||!password){
        return res.status(400).json({
            status: false,
            message: "Payload missing"
        })
      }

      const existingUser = await User.findOne({email});
        if(existingUser){
             return res.status(400).json({
            status: false,
            message: "User already register"
        })
        }
        const hashedpassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name, email, password:hashedpassword
        })
        return res.status(201).json({
             
            status: true,
            message: "User register successfully",
            data:user,
        
        })

   } catch (error) {
       return res.status(500).json({
         status: false,
         message:`Error in register ${error.message}`
       })
   }
}

export const loginUser = async(req,res)=>{
    try {
         const {email, password} = req.body;
         if(!email|| !password){
            res.status(400).json({
                status:false,
                message:"Payload missing"
            })
         }

         const user = await User.findOne({email})

         const isMatch = await bcrypt.compare(password, user.password)
         if (!isMatch) {
             res.json({
                status:false,
                message: "Invalid password"
             })
         }
    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_TOKEN);

         return res.status(200).json({
            status: true,
            message: "User login successfully",
            data:{isMatch,token}
         })


    } catch (error) {
        return res.status(500).json({
         status: false,
         message:`Error in login ${error.message}`
       })
    }
}