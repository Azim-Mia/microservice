import express,{Request,Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors';
import userRouter from './userRouter';
 const app =express();
 app.use(cors());
 app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users', userRouter as any);
app.use((req:Request,res:Response)=>{
  res.status(404).send("Not Found Route");
});
app.use((err:any, _req:Request, res:Response, _next:NextFunction)=>{
  console.error(err.stack);
 res.status(500).json({success:false, message:"Internal Server Error"})
});
export default app