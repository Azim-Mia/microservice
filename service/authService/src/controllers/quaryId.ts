import {Request, Response, NextFunction} from 'express';
import {UserSchema} from '../schemas';
const QuaryId = async(req:Request, res:Response, _next:NextFunction)=>{
  try{
  const { id } = req.params;
  const filed = req.query.filed as string;
  console.log(filed);
  let user;
  if(id){
    user = await UserSchema.findOne({authUserId:id});
  }else{
    user = await UserSchema.findOne({_id:filed});
  }
  if(!user){
    return res.status(404).json({success:false, message:"Not Found User id"});
  }
  res.status(200).json({success:true, message:"user return successfull",user});
  }catch(error:any){
    return res.status(500).send(error.message)
  }
}
export default QuaryId;