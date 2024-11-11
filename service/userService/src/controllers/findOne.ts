import {Request, Response, NextFunction} from 'express';
import User from '../schemas';
const findSingleUser = async(req:Request, res:Response, _next:NextFunction)=>{
  const { id } = req.params;
  const filed = req.query.filed as string;
  let user;
  if(id){
    user = await User.findOne({authUserId:id});
  }else{
    user = await User.findOne({_id:filed});
  }
  if(!user){
    return res.status(404).json({success:false, message:"Not Found User id"});
  }
  res.status(200).json({success:true, message:"user return successfull",user});
}
export default findSingleUser;