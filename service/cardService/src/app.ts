import express, {Request,Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
import cardRouter from './cardRouter';
import cors from 'cors';
import morgan from 'morgan';
import './events/sessionStore';
 const app =express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/card', cardRouter as any);
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(404).send("Not Found Route");
});
app.use((err:any, _req:Request, res:Response, _next:NextFunction)=>{
  console.error(err.stack);
 res.status(500).json({success:false, message:"Internal Server Error"})
})
export default app