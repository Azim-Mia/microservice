import {Request, Response,NextFunction} from 'express';
import { uuid } from 'uuidv4';
import {User} from '../schemas';
import {z} from 'zod';
const userData = z.object({
  authUserId:z.string(),
  name:z.string(),
  email:z.string().email(),
  address:z.string().optional(),
  phone:z.string().optional()
});
 const usercreate =async(req:Request,res:Response, _next:NextFunction)=>{
   const {email} =req.body;
  const exitsEmail =await User.findOne({email:email});
  if(exitsEmail){
    return res.status(200).json({})
  }
const users = userData.safeParse({authUserId:uuid(),...req.body});
if(!users.success){
   res.status(404).json({error: users.error.errors});
};
const userAdd = new User(users.data);

const result = await userAdd.save();
res.status(201).json({
  success:true,
  message:"user create successfull",
  result:result,
});
}
export default usercreate;