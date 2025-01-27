import {Request, Response,NextFunction} from 'express';
//import { uuid } from 'uuidv4';
import User from '../schemas';
import ProfileModel from './profileSchema';
import {z} from 'zod';
const userData = z.object({
  name:z.string(),
  email:z.string().email(),
  image:z.string().optional(),
  address:z.string().optional(),
  phone:z.string().optional()
});
 const registerUser =async(req:Request,res:Response, _next:NextFunction)=>{
try{
const users = userData.safeParse(req.body);
const exist = await User.findOne({email:users.data?.email});
if(exist){
  return res.status(200).json({
  success:false,
  message:"User already Created",
})
}
if(!users.success){
   res.status(404).json({error: users.error.errors});
};
const userAdd =await new User(users.data);
if(!userAdd){
  return res.status(400).json({success:false, message:"User is not Register. Try again"});
}else{
const p= await new ProfileModel({authUserId:userAdd?.authUserId});
console.log("profile" + p);
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
export default registerUser;