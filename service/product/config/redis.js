const {createClient} =require('redis');
const client = createClient({
    password: '3hkRzC7kUwnEbQYFnEhIVJZCiM1FKd7j',
    socket: {
        host: 'redis-14923.c280.us-central1-2.gce.redns.redis-cloud.com',
        port: 14923
    }
});
client.on('connect', ()=>{
  console.log("redis is connect");
})
client.on('ready', ()=>{
  console.log("redis is ready..");
})
client.on('error', err => console.log('Redis Client Error', err));
client.on('end', ()=>{
  console.log('Disconnect is redis');
});
module.exports = client;