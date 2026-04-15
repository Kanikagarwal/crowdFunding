import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        res.json({success:false,message:"No token found, Login again."});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
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
export default authMiddleware;