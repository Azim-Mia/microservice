import express from 'express'
import bodyParser from 'body-parser'
import { usercreate} from './controllers';
import cors from 'cors';
 const app =express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/create/user',usercreate);
export default app