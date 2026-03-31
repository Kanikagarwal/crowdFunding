import jwt from "jsonwebtoken";

const authOrganiser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.json({ success: false, message: "No token provided" });
        }
        
        const token = authorization.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "Token missing from header" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.organiserId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Unauthorized, Invalid Token" });
    }
};

export default authOrganiser;
