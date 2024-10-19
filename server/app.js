import express from 'express'
import { Server } from "socket.io";
import { createServer } from "http"
import cors from 'cors'
const app = express()

const port = 3000

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["Get", "Post"],
    credentials: true
  }
})
io.use((socket,next)=>{
  if(user)  next()

})
io.on("connection", (socket) => {
  console.log("user connected", socket.id)
  // socket.emit("welcome", `welcome to server ${socket.id}`)
  // socket.broadcast.emit("welcome" , `${socket.id}joined the server`) // jo nya connection hua hai usko chhodkr sbko msg jaayega

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`)
  })

  socket.on("message", (m) => {
    console.log("message recieved from frontend- ", m)
    io.to(m.room).emit("recieve-message", m)
  })

  socket.on("join-room", (room) => {
    socket.join(room)
    console.log(`${socket.id} joined ${room}`)
  })

})

app.get('/', (req, res) => {
  res.send("Hello")
})

app.use(cors())

server.listen(port, () => {
  console.log("app is listening on port", port)
})
