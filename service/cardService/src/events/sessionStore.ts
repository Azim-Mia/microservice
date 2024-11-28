import { Redis } from 'ioredis';
import clearCard from "../servises/clearCard"
const redis = new Redis({
  password: '3hkRzC7kUwnEbQYFnEhIVJZCiM1FKd7j',
        host: 'redis-14923.c280.us-central1-2.gce.redns.redis-cloud.com',
        port: 14923
});
const CHENAL_KEY ='__keyevent@0__:expired';
redis.config('SET', 'notify-keyspace-events','Ex');
redis.subscribe(CHENAL_KEY);
redis.on('message', async(ch, message)=>{
  if(ch == CHENAL_KEY){
    console.log('expired key : ' + message);
  const cardKey = message.split(":").pop();
  if(!cardKey) return;
  clearCard(cardKey);
  }
})