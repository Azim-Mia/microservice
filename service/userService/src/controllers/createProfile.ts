import {Request, Response, NextFunction } from 'express';
//import ProfileModel from '../profileSchema';
const createProfile =(_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello");
}
export default createProfile;