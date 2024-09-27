const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

client.on('error', (err) => {
    console.log('Redis Client Error', err);
});

// Ensure the client is connected before sending commands
client.connect().then(() => {
    console.log('Connected to Redis');
});

const getCacheData = async (key) => {
    try {
        return await client.get(key);
    } catch (error) {
        console.error('Error getting data from Redis', error);
    }
};

const setCachedata = async (key, value) => {
    try {
        await client.set(key, JSON.stringify(value), { EX: 3600 }); // Expires in 1 hour
    } catch (error) {
        console.error('Error setting data in Redis', error);
    }
};

module.exports = { getCacheData, setCachedata };
