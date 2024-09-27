


const redis=require('redis');
const { error } = require('winston');
const client=redis.createClient();

// handle redis error globallly
client.on('error',(error)=>{
    console.log("the error is ",error);
});


// healper to get data from the redis
const getCacheData=async(key)=>{

    return new Promise((resolve,reject)=>{
          client.get(key,(err,data)=>{
            if(err) return reject(err);
            resolve(data?JSON.parse(data):null);
          });
    });
}


// helper to get save data into redis
const  setCachedata=(key,data,expire=3000)=>{
    client.set(key,JSON.stringify(data),'EX',expire);   // default expirey in 1 hour
};


module.exports={getCacheData,setCachedata};


