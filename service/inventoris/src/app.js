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
  origin:["http://localhost:8081","http://localhost:3001","http://localhost:8158","http://localhost:4001","http://localhost:4002"],
methot:["PUT","POST","GET","UPDATE"],
credentials:true,
}));
app.use(morgan());
app.use('/inventoris', inventoryRouter);
app.use((req,res)=>{
  res.send("Route not Found");
})
module.exports = app;