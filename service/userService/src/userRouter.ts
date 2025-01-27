import express from 'express';
import { registerUser, updateUser,findSingleUser,findAllUser} from './controllers';
const userRouter = express.Router();
userRouter.post('/register',registerUser as any);
userRouter.post('/update',updateUser as any);
userRouter.get('/find',findAllUser as any);
userRouter.get('/:id', findSingleUser as any);
export default userRouter;