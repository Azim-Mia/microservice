import {connectDB} from '../config/db';
import {default as app} from './app';
app.get('/', (_req,res)=>{
  res.json({message:'return successfull'});
})
app.listen(4004,()=>{
  console.log(`http://localhost:4004`);
  connectDB()
});