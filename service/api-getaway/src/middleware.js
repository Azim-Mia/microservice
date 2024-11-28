const axios =require('axios');
const {req:Request, res:Response, next:NextFunction} =require('express');
 const auth =async(req,res,next)=>{
 try{
 if(!req.headers['authorization']){
    return res.status(403).json({success:false, message:"Unauthorization"});
  };
 const token = req.headers['authorization'];
 console.log(token)
 if(token != "azim"){
   return res.send("Unauthorization Header must connect azim")
 }
 next(); 
}catch(error){
  return res.status(401).json({success:false,error:error.code, message:"Unauthorization"})
}
}
const middlewares ={auth}
module.exports =middlewares