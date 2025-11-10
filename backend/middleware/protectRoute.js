import jwt from "jsonwebtoken";
import User from "../models/user.model.js";



const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error:"Unauthorized: No token Provided"})
        }

        const decode = jwt.verify(token,process.env.jwt.JWT_SECRET);

        if(!decode){
            return res.status(400).json({error:"Unauthorized: Invalid Token"})
        }

        const user = await User.findOne({_id: decode.userId}).select("-password");

        if(!user){ 
            return res.status(400).json({error:"User Not Found"})
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.log(`Error in protectRoute: ${error}`)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectRoute;