import express from 'express';
import {findSingleUser,findAllUser, QuaryId, registerUser, loginUser,verifyUser,verifyEmail} from './controllers';
const userRouter = express.Router();
userRouter.post('/users/register',registerUser as any);
userRouter.get('/users/find',findAllUser as any);
userRouter.get('/users/:id', findSingleUser as any);
userRouter.get('/users/q', QuaryId as any);
userRouter.post('/users/login', loginUser as any);
userRouter.post('/users/token-verify', verifyUser as any);
userRouter.post('/users/email/verify', verifyEmail as any);
export default userRouter;