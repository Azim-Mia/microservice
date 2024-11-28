import express, {Request,Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
import orderRouter from './orderRouter';
import cors from 'cors';
import morgan from 'morgan'
 const app =express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/orders', orderRouter as any);
app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(404).send("Not Found Route");
    next();
});
app.use((err:any, _req:Request, res:Response, _next:NextFunction)=>{
  console.error(err.stack);
 res.status(500).json({success:false, message:"Internal Server Error"})
})
export default app