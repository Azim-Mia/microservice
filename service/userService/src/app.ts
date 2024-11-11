import express,{Request,Response} from 'express'
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
export default app