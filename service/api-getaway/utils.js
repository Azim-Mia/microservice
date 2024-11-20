 const config = require('./config.json');
 const axios = require('axios');
 const  middlewares  = require('./src/middleware.js');
const createHandler =(hostname,path,method)=>{
  return async(req,res)=>{
  try{
  let url = `${hostname}${path}`;
  req.params && Object.keys(req.params).forEach(param =>{
   url = url.replace(`:${param}`,req.params[param]);
 });
  const {data}= await axios({
    method:method,
    url:url,
    data:req.body,
    headers:{
      origin:"http://localhost:8081",
    }
   });
  res.json(data)
 }catch(error){
     return res.status(500).send(error.message);
 }
 }
 };
 
 //protected routing process
 // name type string[]
 const getMiddleware = (names)=>{
  return names.map((name)=>middlewares[name]);
  };
  
 const apiConfigate =(app)=>{
 try{
Object.entries(config.services).forEach(([name, service])=>{
  const hostname = service.url;
  service.routes.forEach((route)=>{
 
  //call this function
  const middleware = getMiddleware(service.middlewares);
  
    route.methods.forEach((method)=>{
    //call this function
  const responseResult= createHandler(hostname,route.path, method);
  //route hit now..
  app[method](`/api${route.path}`,middleware,responseResult);
    });
  });
});
}catch(err){
  throw new Error(err);
}
}
module.exports = apiConfigate