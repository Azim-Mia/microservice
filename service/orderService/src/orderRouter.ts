import express from 'express';
import {health, checkOut} from './controllers';
const orderRouter = express.Router();
orderRouter.get('/health', health as any)
orderRouter.post('/checkout', checkOut as any)
export default orderRouter;