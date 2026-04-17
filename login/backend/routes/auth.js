import express from "express"
import User from "../models/User.js"
import {body,validationResult} from "express-validator"

const router = express.Router()

router.post("/signup",
  [body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("email is not valid"),
    body("password").isLength({min:5}).withMessage("password must be at least 5 character")
  ],
  async(req,res)=>{
    try {

      const err = validationResult(req)
         if(!err.isEmpty()){
          return res.json({errors: err.array()});
         }

        const{name,email,password} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.json({msg:"User already exists"})
        }

        user = new User({name,email,password})
        await user.save()

        res.json({msg:"Register Successfully", user})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router