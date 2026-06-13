const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = {
  redis,
};