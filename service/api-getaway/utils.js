 const config = require('./config.json');
 const axios = require('axios');
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
   });
  res.json(data)
 }catch(error){
     return res.status(500).send(error.message);
 }
 }
 };
 
 const apiConfigate =(app)=>{
 try{
Object.entries(config.services).forEach(([name, service])=>{
  const hostname = service.url;
  service.routes.forEach((route)=>{
    route.methods.forEach((method)=>{
  const responseResult= createHandler(hostname,route.path, method);
  //route hit now..
   app[method](`/api${route.path}`,responseResult);
    });
  });
});
}catch(err){
  console.log(err.message);
}
}
module.exports =apiConfigate