import {Request, Response,NextFunction} from 'express';
import {z} from 'zod';
import axios from 'axios'
import { UserSchema,VerifiedCodeSchema } from '../schemas';
const dataVlidation = z.object({
  code:z.string(),
  email:z.string().email(),
});
const verifyEmail =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  const bodyParse = dataVlidation.safeParse(req.body);
  const user = await UserSchema.findOne({email:bodyParse?.data?.email});
 console.log(user);
  if(!user){
    return res.status(200).json({success:false, messages:"Not Found user register now"})
  };
  if(user.verified && user.status == "ACTIVE"){
    return res.status(200).json({success:false,messages:"user already verified"});
  }
   const successUpdate = await UserSchema.findByIdAndUpdate({_id:user._id},{
    $set:
      {
        verified:true,
        status:"ACTIVE"
      }
    });
    if(!successUpdate){
    return res.status(403).json({success:false,messages:"user not update something problem try again"});
    };
    //update user verification schema
    const successVerifyCodeUpdate = await VerifiedCodeSchema.insertMany([
      {
      userId:user.authUserId,
      status:"USED",
      }
      ]);
  if(!successVerifyCodeUpdate){
    return res.status(200).json({success:false,messages:"user not update"});
  }
  //send success email
    await axios.post("http://localhost:4005/email/send",{
    recipient:user.email,
    subject:"user verify",
    body:"successfull your account verify",
    source:"verify",
    sender:user.neme,
    });
    //success response
  return res.status(200).json({success:true,messages:"update successfull"})
}catch(error:any){
  res.status(500).send(error);
}
}
export default verifyEmail;