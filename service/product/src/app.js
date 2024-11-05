const express = require('express');
const bodyParser = require('body-parser');
const morgan =require('morgan')
 const cors =require('cors');
 const xssClean = require('xss-clean')
const productRouter = require("../src/routers/productRouter.js");  
const app = express();
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan())
app.use(xssClean());
app.use(cors({
  origin:["http://localhost:8158","http://localhost:4002","http://localhost:4001"],
methot:["PUT","POST","GET","UPDATE"],
credentials:true,
}));
app.use('/products', productRouter);
app.use((req,res,next)=>{
  res.send("NOT FOUND ROUTE");
})
module.exports = app;
/*app.use((req,res,next)=>{
  const allowOrigin = ["http://localhost:8081","http://127.0.0.1:8081"];
  const origin = req.headers.origin || '';
  if(allowOrigin.includes(origin)){
    res.setHeader('Access-Control-Allow-Origin',origin);
    next();
  }else{
  return res.status(403).json({message:"forbidden"});
  }
})*/