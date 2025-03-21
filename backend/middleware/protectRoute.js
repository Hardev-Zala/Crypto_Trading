import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js";
import { User, UserLockScreenPasscode } from "../model/user.model.js";

const protectRoute = async (req,res,next) => {

  try {
    
    const token = req.cookies["jwt-trading"];
    // console.log("Cookies :- ",req.cookies); 
    
    // console.log("Your Token :- ",token);
    if(!token) return res.status(400).json({success:false,message:"Unauthorized access - no token provided"})

    const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET)

    if(!decoded) return res.status(401).json({success:false,message:"Unauthorized access - invalid token"})

    // for(const key in decoded){
      // console.log(`JWT decoded Key:- ${key} And Value :- ${decoded[key]}`);
      
    // }
    
    const user = await UserLockScreenPasscode.findById(decoded.userId).select("-password") // excluded password from the document

    if(!user) return res.status(404).json({success:false,message:"User not found"})
    
    req.user = user

    // console.log(req);

    next()

    // res.status(201).json({success:true,message:"Authorized"})
    
  } catch (error) {
    console.log('error in Protected Route :- '+error);

    res.status(500).json({success:false,message:error})
    
  }
}

export default protectRoute