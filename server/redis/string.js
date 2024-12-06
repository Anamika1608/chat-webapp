import client from "../client.js";

async function init() {
    // await client.set('msg:1' , 'hey fron nodejs')
    await client.expire('msg:1',10);
    const result = await client.get('user:3');
    const result2 = await client.get('msg:1');
    console.log(result);
    console.log(result2);
}

init()  

// to intialize redis - docker exec -it container-id bash
// then enter redis-cli


// for postgres sql - open terminal in the docker file 
// docker-compose up -d


// to get all the keys name starting with user - keys user:*   
// result - user:1
// user:2
// user:3