import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

function App() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("")
  const [roomName , setRoomName] = useState("")
  const [socketId, setsocketId] = useState("")

  const [recievedMsg, setRecievedMsg] = useState([])

  const handleRoom = (e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName)
    setRoomName("")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { msg, room })
    setMsg("")
  };

  useEffect(() => {
    socket.on("connect", () => {
      setsocketId(socket.id)
      console.log("connected frontend", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("recieve-message", (recieved) => {
      setRecievedMsg((data) => [...data, recieved])
      console.log(`recieved msg ${recieved.msg}`)
      console.log(`recieved room ${recieved.room}`)
    })

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        {socketId}

        <div>join room</div>
        <input
          type="text"
          value={roomName}
          placeholder='room name'
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
        <button onClick={handleRoom}>Submit</button>
        <input
          type="text"
          value={msg}
          placeholder='msg'
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder='receiving room id'
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
        {recievedMsg && recievedMsg.length > 0 ? (
          <div>
            {recievedMsg.map((m, index) => (
              <div key={index}>{m.msg}</div>
            ))}
          </div>
        ) : (
          <div>No messages yet</div>
        )}

      </div>
    </>
  );
}

export default App;
