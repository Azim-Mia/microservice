const express = require('express');
const bodyParser = require('body-parser')
 const app = express();
 const inventoryRouter=require('./routers/inventoryRouter.js')
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/inventory', inventoryRouter);
app.use((req,res)=>{
  res.send("Route not Found");
})
module.exports = app;