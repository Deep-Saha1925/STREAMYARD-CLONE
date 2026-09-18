import http from "http";
import express from "express";
import path from "path";
import { spawn } from "child_process";
import {Server as SocketIO} from "socket.io"

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.static(path.join("public")));

const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/dcfx-m7v2-j248-3185-9207`,
];

const ffmpegProcess = spawn('ffmpeg', options);

ffmpegProcess.stdout.on("data", (data) => {
  console.log(`FFmpeg stdout: ${data}`);
})

ffmpegProcess.stderr.on("data", (data) => {
  console.error(`FFmpeg stderr: ${data}`);
})

ffmpegProcess.on("close", (code) => {
  console.log(`FFmpeg process exited with code ${code}`);
})

io.on("connection", (socket) => {
    console.log("SocketA connected");
    socket.on("binarystream", (stream) => {
        console.log("Received binary stream data:", stream);
        ffmpegProcess.stdin.write(stream, (err) => {
          if (err) {
            console.error("Error writing stream data to ffmpeg stdin:", err);
          } else {
            console.log("Stream data written to ffmpeg stdin");
          }
        })
    })
})

server.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
})