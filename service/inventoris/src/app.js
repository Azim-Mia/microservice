const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors');
 const app = express();
 const inventoryRouter=require('./routers/inventoryRouter.js')
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors({
  origin:["http://localhost:3001","http://localhost:8158","http://localhost:4001","http://localhost:4002"],
methot:["PUT","POST","GET","UPDATE"],
credentials:true,
}));
app.use('/inventoris', inventoryRouter);
app.use((req,res)=>{
  res.send("Route not Found");
});
app.use((err, req, res, next)=>{
  console.error(err.stack);
 res.status(500).json({success:false, message:"Internal Server Error"})
})
module.exports = app;
/*app.use(morgan());
app.use((req,res,next)=>{
  const allowOrigin = ["http://localhost:8081","http://127.0.0.1:8081"];
  const origin = req.headers.origin || '';
  if(allowOrigin.includes(origin)){
    res.setHeader('Access-Control-Allow-Origin',origin);
    next();
  }else{
  return res.status(403).json({message:"forbidden"});
  }
})*/