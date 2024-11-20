import express from 'express';
import {sendEmailController,findEmailController} from './controllers';
const emailRouter = express.Router();
emailRouter.post('/send',sendEmailController as any)
emailRouter.get('/find',findEmailController as any)

export default emailRouter;