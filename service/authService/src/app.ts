import express, {Request,Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
import userRouter from './userRouter';
import cors from 'cors';
import morgan from 'morgan';
 const app =express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/auth', userRouter as any);
app.use((req:Request,res:Response,next:NextFunction)=>{
  try{
    res.status(404).send("Not Found Route");
  }catch(error:any){
   res.status(500).send('Internal server error');
  };
  next();
});
export default app