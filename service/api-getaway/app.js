const express =require('express');
require('dotenv').config();
const morgan = require('morgan');
const apiConfigate=require('./utils.js');
const app =express();
app.use(express.json());
app.use(morgan());
app.get('/help',(req,res)=>{
  res.send('helth route');
});
apiConfigate(app);
app.use((req,res)=>{
  res.send('Not found route');
});

module.exports = app;