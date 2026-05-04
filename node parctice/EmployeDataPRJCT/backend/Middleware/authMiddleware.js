import jwt from 'jsonwebtoken'


export const protect = (req,res,next)=>{
    try {
         let token = req.headers.token;
         if(!token){
            return res.status(401).json({
                status: false,
                message:"Unauthorize - Invalid token"
            })
         }
         const decoded = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
         req.user = decoded;

          console.log(token);
          console.log(decoded);

          
       
          
          next()
    } catch (error) {
        res.status(401).json({
            status: false,
            message: `Error in Unauthorize - user ${error.message}`
        })
    }
}