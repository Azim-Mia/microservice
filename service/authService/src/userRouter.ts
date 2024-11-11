import express from 'express';
import {findSingleUser,findAllUser,usercreate, QuaryId, loginUser} from './controllers';
const userRouter = express.Router();
userRouter.post('/users/create',usercreate as any);
userRouter.get('/users/all',findAllUser as any);
userRouter.get('/users/:id', findSingleUser as any);
userRouter.get('/users', QuaryId as any);
userRouter.post('/users/login', loginUser as any);
export default userRouter;