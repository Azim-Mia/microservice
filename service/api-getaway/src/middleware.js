const axios =require('axios');
const {req:Request, res:Response, next:NextFunction} =require('express');
 const auth =async(req,res,next)=>{
 if(!req.headers['authorization']){
    return res.status(403).json({success:false, message:"Unauthorization"});
  };
 try{
 const token = req.headers['authorization'];
  const {data} = await axios.post("http://localhost:4004/auth/users/token-verify",{token:token});
  console.log(data)
  req.headers['x-users-id']= data?.payload?.authUserId || 'hgy';
  next(); 
}catch(error){
  return res.status(401).send(error, "Unauthorization")
}
}
const middlewares ={auth}
module.exports =middlewares