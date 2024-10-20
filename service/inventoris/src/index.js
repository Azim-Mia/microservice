const connectDB = require('../config/db.js');
const app =require('./app.js')
app.listen(4002, ()=>{
  console.log(`http://localhost:4002`);
  connectDB();
})