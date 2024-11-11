import {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import {UserSchema,LoginHistorySchema} from '../schemas';

type historyData ={
  userId:string,
  ipAddress:string,
  userAgent:string,
  attempt:string,
};
const loghistory =async (info:historyData)=>{
await LoginHistorySchema.insertMany([
    {
      userId:info.userId,
  ipAddress:info.ipAddress,
  userAgent:info.userAgent,
  attempt:info.attempt,
    },
    ]);
};
const loginUser = async(req:Request, res:Response, _next:NextFunction)=>{
  try{
    const userData = z.object({
  email:z.string().email(),
  password:z.string(),
});
const ipAddress = req.headers['x-forwarded-for'] as string || req.ip || '';
const userAgent = req.headers['user-agent'] || '';

const parseBody = userData.safeParse({...req.body});
if(!parseBody.success){
   res.status(404).json({error: parseBody.error.errors});
};
const user = await UserSchema.findOne({email:parseBody?.data?.email});
const historyAll = await LoginHistorySchema.find();
console.log(historyAll);
if(!user){
  //history create 
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED"});
      return res.status(404).json({success:false,message:"User2 not match User or Password "})
    };
    const bodyPassword:string = req.body.password;
const isMatchPassword =await bcrypt.compare(bodyPassword, user.password);
if(!isMatchPassword){
  //history create 
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED"});
  return res.status(404).json({success:false,message:"User not match User1 or Password "})
};
//check verified user
if(!user.verified){
  // history create
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED"});
  return res.status(404).json({success:false,message:"User was not verified"});
};
//check login status user
if(user.status !== 'ACTIVE'){
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED"});
  return res.status(404).json({success:false,message:`user was not ${user.status}`});
}
//Generate token create
 const token = await jwt.sign({name:user.name, email:user.email,role:user.role}, 'azim', {expiresIn:'10m'})
 
 if(!token){
     return res.status(404).json({success:false,message:"User login token problem"});
 }
//verify User
    return res.status(200).json({success:true, message:"Successfull LogIn",token:token})
  }catch(error:any){
    if( error instanceof Error){
      res.status(500).send(error.message);
    }
  }
}
export default loginUser;