import {Request, Response,NextFunction} from 'express';
import { uuid } from 'uuidv4';
import User from '../schemas';
import {z} from 'zod';
const userData = z.object({
  authUserId:z.string(),
  name:z.string(),
  email:z.string().email(),
  image:z.string().optional(),
  address:z.string().optional(),
  phone:z.string().optional()
});
 const usercreate =async(req:Request,res:Response, _next:NextFunction)=>{
try{
const users = userData.safeParse({authUserId:uuid(),...req.body});
if(!users.success){
   res.status(404).json({error: users.error.errors});
};
const userAdd = new User(users.data);
if(!userAdd){
  return res.status(400).json({success:false, message:"user userAdd data problem"});
};
const result = await userAdd.save();
if(!result){
  return res.status(400).json({success:false, message:"user create problem"});
};
res.status(201).json({
  success:true,
  message:"user create successfull",
  result:result,
});
}catch(error:any){
  res.send(error.message)
}
}
export default usercreate;