import {Request, Response,NextFunction} from 'express';
import { uuid } from 'uuidv4'
import axios from 'axios';
require('dotenv').config();
import { UserSchema } from '../schemas';
import {z} from 'zod';
const user_port = process.env.USER_SERVER || "http://localhost:4003";

const userData = z.object({
  authUserId:z.string(),
  name:z.string(),
  email:z.string().email(),
  password:z.string(),
});
 const usercreate =async(req:Request,res:Response, _next:NextFunction)=>{
try{
const user = userData.safeParse({authUserId:uuid(),...req.body});
if(!user.success){
   res.status(404).json({error: user.error.errors});
};
const email :any = user?.data?.email;
const exits =await UserSchema.findOne({email:email});
 if(exits){
   return res.status(400).json({success:false, message:"user email is exits"});
 };
const userAdd = new UserSchema(user.data);
if(!userAdd){
  return res.status(400).json({success:false, message:"user userAdd data problem"});
};
// send email Position 
//verified email
//create profile...
const profileData = z.object({
  authUserId:z.string(),
  name:z.string(),
  email:z.string().email(),
});
const profile = profileData.safeParse({
  authUserId:userAdd?.authUserId,
  ...req.body,
})
if(!profile.success){
  return res.status(404).json({error: profile.error.errors});
};
await axios.post(`${user_port}/users/create`,profile?.data)

const result =await userAdd.save();
  return res.status(201).json({
   success:true,
   message:'successfull',
   payload:result,
 });
}catch(error:any){
  res.send(error.message);
}
}
export default usercreate;