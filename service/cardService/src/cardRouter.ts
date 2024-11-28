import express from 'express';
import {health, addCard, myCard, finalyCleanCard} from './controllers';
const cardRouter = express.Router();
cardRouter.get('/health', health as any)
cardRouter.post('/add-to-card', addCard as any)
cardRouter.get('/me', myCard as any);
cardRouter.get('/clear', finalyCleanCard as any);
export default cardRouter;