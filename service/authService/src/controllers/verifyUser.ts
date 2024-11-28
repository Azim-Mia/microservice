import {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
require('dotenv').config();
import { UserSchema } from '../schemas';
//const user_port = process.env.USER_SERVER || "http://localhost:4003";
 const verifyUser =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  const {token} =req.body;
  if(!token){
    return res.status(404).json({success:false, message:"Body token is Empty"});
  }
  const decoded:any = await jwt.verify(token, 'azim');
  if(!decoded){
    return res.status(404).json({success:false, message:"Not verified user token"});
  };
  console.log(decoded + "bangladesh")
  //create User
const successUser = await UserSchema.create(decoded);
 //update user
  await UserSchema.findByIdAndUpdate({_id:successUser._id},{ $set:
      {
    verified:true,
    status:"INACTIVE"
      }
   });
    //create profile
  const profileData ={
    authUserId:decoded.authUserId,
    name:decoded.name,
    email:decoded.email,
  }
  await axios.post("http://localhost:4003/users/profile", profileData);
  return res.status(201).json({success:true,message:"successfull verify"});
}catch(error:any){
  const errData = error?.errorResponse?.errmsg || error;
  console.log(error);
  return res.status(500).json({success:false, message:"Intrnel server Error", Error:errData});
}
}
export default verifyUser;