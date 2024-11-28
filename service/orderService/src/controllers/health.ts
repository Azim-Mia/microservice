import {Request, Response, NextFunction} from 'express';
const health= async(req:Request, res:Response, _next:NextFunction)=>{
  res.send('health route');
}
export default health;