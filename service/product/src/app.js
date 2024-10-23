const express = require('express');
const bodyParser = require('body-parser');
 const cors =require('cors');
 const xssClean = require('xss-clean')
const productRouter = require("../src/routers/productRouter.js");  
const app = express();
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(xssClean());
app.use(cors({
  origin:["http://localhost:8081","http://localhost:3000","http://localhost:8158","http://localhost:4002","http://localhost:4001"],
methot:["PUT","POST","GET","UPDATE"],
credentials:true,
}));
app.use('/products', productRouter);
app.use((req,res,next)=>{
  res.send("NOU FOUND ROUTE");
})
module.exports = app;