import {Request, Response, NextFunction} from 'express';
import {z} from 'zod';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
//import jwt from 'jsonwebtoken';
import axios from 'axios';
import {UserSchema,LoginHistorySchema} from '../schemas';

//randomNum code generate
const generateCode = ()=>{
  const timestamp = new Date().getTime().toString();
  const randomNum = Math.floor(10 + Math.random() * 90);
  let code = (timestamp + randomNum).slice(-5);
  return code;
};
type historyData ={
  userId:string,
  ipAddress:string,
  userAgent:string,
  attempt:string,
  description:string,
};

const loghistory =async (info:historyData)=>{
await LoginHistorySchema.insertMany([
    {
      userId:info.userId,
  ipAddress:info.ipAddress,
  userAgent:info.userAgent,
  attempt:info.attempt,
  description:info.description,
    },
    ]);
};

const loginUser = async(req:Request, res:Response, next:NextFunction)=>{
  try{
    const userData = z.object({
  email:z.string().email(),
  password:z.string(),
});
const ipAddress = req.headers['x-forwarded-for'] as string || req.ip || '';
const userAgent = req.headers['user-agent'] || '';

const parseBody = userData.safeParse({email:req.body.email,password:req.body.password || ''});
if(!parseBody.success){
   return res.status(404).json({error: parseBody.error.errors});
};
const user = await UserSchema.findOne({email:parseBody?.data?.email});
console.log(user.loginHistoris)
if(!user){
  //history create 
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:'not found user'});
      return res.status(404).json({success:false,message:"Email not match"});
    };
    const bodyPassword:string = req.body.password;
const isMatchPassword =await bcrypt.compare(bodyPassword, user.password);
if(!isMatchPassword){
  //history create 
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:'password is not match'});
  return res.status(404).json({success:false,message:"Password not match"})
};
//check verified user
if(!user.verified){
 await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:'user not verified'});
  // history create
  return res.status(404).json({success:false, message:"send verification code, check Email verified now"});
};
//check login status user
if(user.status !== 'ACTIVE'){
  await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"FAILED",description:"user not active"});
   res.status(404).json({success:false,message:`user :${user.status}, send verification code, check your Email verification now`, });
};
//verify User
const code = generateCode();
//const token = await jwt.sign({name:"azin"}, 'azim', {expiresIn:'1h'});
 const emailData={
   recipient:req.body.email,
     subject:"Verify user login now",
     body:`<div>
     <h1>Verify Token ${code}</h1>
    <a href="http://localhost:3000/verify">Active</a>
     </div>`,
     source:'user create',
     sender:req.body.name,
 };
 // send email Position 
 await axios.post("http://localhost:4005/email/send",emailData);
await loghistory({userId:user?.authUserId || "",ipAddress:ipAddress,userAgent:userAgent,attempt:"SUCCESS",description:"Successfull login"});
return res.status(200).json({success:true, message:"successfull login"});
  }catch(error:any){
    if( error instanceof mongoose.Error){
    return res.status(500).send(error);
    }
  }
}
export default loginUser;