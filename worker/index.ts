
import { createClient } from 'redis'

const client = createClient()


async function main() {
    await client.connect();
    while(1){
        const response = await client.brPop('submission',0);
        console.log(response)
        // actually runs the user code 
        await new Promise((resolve)=> setTimeout(resolve , 1000))
        // send it to pubsub

        console.log("user submission processed")
    }
}

main()


// npx tsc-b for compiling the ts code to js
// node dist/index.js to run the final server