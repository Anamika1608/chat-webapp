import express from 'express'
import { createClient } from 'redis'

const app = express()
app.use(express.json())

const client = createClient()

async function startServer() {
    try {
        await client.connect();
        console.log("client connected");

        app.listen(3000, () => {
            console.log("port is running on 3000")
        })
    } catch (error) {
        console.log("faled to connect with redis", error)
    }
}

startServer()

app.post('/submit', async (req, res) => {
    const { problemId, userId, code, lang } = req.body();
    // push this to db
    await client.lPush('submission', JSON.stringify({ problemId, userId, code, lang }))
    res.json({ message: "submission received" })
})