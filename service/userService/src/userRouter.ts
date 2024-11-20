import express from 'express';
import { usercreate, updateUser,findSingleUser,findAllUser} from './controllers';
const userRouter = express.Router();
userRouter.post('/profile',usercreate as any);
userRouter.post('/update',updateUser as any);
userRouter.get('/find',findAllUser as any);
userRouter.get('/:id', findSingleUser as any);
export default userRouter;