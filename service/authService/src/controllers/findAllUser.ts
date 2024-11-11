import {Request, Response, NextFunction} from 'express';
import {UserSchema} from '../schemas';
const findAllUser = async(req:Request, res:Response, _next:NextFunction)=>{
  const result = await UserSchema.find();
  if(!result){
    return res.status(404).json({success:false, message:"not found User id"});
  }
  res.status(200).json({success:true, message:"user return successfull",result});
}
export default findAllUser;