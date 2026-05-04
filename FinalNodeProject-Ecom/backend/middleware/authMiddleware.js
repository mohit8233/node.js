import jwt from "jsonwebtoken";

export const protect = (req,res,next)=>{
    try {
        const token = req.headers.token
        if (!token) {
            return res.status(401).json({
                status: false,
                message:"Unauthorized - Invalid token"
            })
        }
        const decoded =  jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
       console.log(decoded);
       next()
       
        
    } catch (error) {
    return res.status(401).json({
            status:false,
            message:`Unauthorized- token ${error.message}`
        })
    }
}