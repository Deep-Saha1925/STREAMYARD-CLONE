import http from "http";
import express from "express";
import path from "path";
import {Server as SocketIO} from "socket.io"

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.static(path.join("public")));

io.on("connection", (socket) => {
    console.log("SocketA connected");
    socket.on("binarystream", (data) => {
        console.log("Received binary stream data:", data);
    })
})

server.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
})