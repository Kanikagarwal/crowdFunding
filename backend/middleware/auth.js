import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next)=>{
    const token = req.headers;
    if(!token){
        res.json({success:false,message:"No token found, Login again."});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!req.body){
        req.body = {};
    }
    if(decoded.id){
        req.body.userId = decoded.id;
    }
    else{
            return res.json({success:false,message:"Not Authorized. Login again"})
        }
    next();
    } catch (error) {
        res.json({success:false,message:error.message})
    }
    
    
}