import { Redis } from 'ioredis';
const redis = new Redis({
  password: '3hkRzC7kUwnEbQYFnEhIVJZCiM1FKd7j',
        host: 'redis-14923.c280.us-central1-2.gce.redns.redis-cloud.com',
        port: 14923
});
export default redis;