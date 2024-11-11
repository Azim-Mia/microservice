import express from 'express';
import { usercreate, updateUser,findSingleUser,findAllUser} from './controllers';
const userRouter = express.Router();
userRouter.post('/create',usercreate as any);
userRouter.post('/update',updateUser as any);
userRouter.get('/all',findAllUser as any);
userRouter.get('/:id', findSingleUser as any);
export default userRouter;