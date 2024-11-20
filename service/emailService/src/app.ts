import express, {Request,Response} from 'express'
import bodyParser from 'body-parser'
import emailRouter from './emailRouter';
import cors from 'cors';
import morgan from 'morgan';
 const app =express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/email', emailRouter as any);
app.use((req:Request,res:Response)=>{
  res.status(404).send("Not Found Route");
});
export default app