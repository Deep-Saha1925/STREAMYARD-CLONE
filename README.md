# StreamYard Clone

A lightweight streaming app inspired by StreamYard, built with Node.js, Express, Socket.IO, and FFmpeg. The application captures a user's microphone and camera from the browser, forwards the stream to the server, and pipes it to a live RTMP destination such as YouTube Live.

## Overview

This project demonstrates a simple live streaming pipeline:

- Browser captures video and audio using `getUserMedia()`
- Media chunks are sent from the frontend to the backend using Socket.IO
- The Node.js server receives binary data
- FFmpeg encodes the incoming stream and pushes it to an RTMP URL

This is a minimal but functional prototype for live streaming workflows.

## Tech Stack

- Node.js
- Express
- Socket.IO
- FFmpeg
- HTML / JavaScript
- Docker

## Project Structure

```bash
.
├── Dockerfile
├── docker-compose.yml
├── index.js
├── package.json
├── package-lock.json
├── public/
│   ├── index.html
│   └── script.js
└── README.md
```

## How It Works

### Frontend
The browser asks for camera and microphone access and creates a `MediaRecorder` instance. When the user clicks the Start Streaming button, the app begins recording media and emits binary chunks over a Socket.IO connection.

### Backend
The Node.js server listens for socket events and writes the incoming binary stream directly to FFmpeg's standard input.

### Streaming Engine
FFmpeg is configured to encode the media into a live RTMP stream using the specified target URL. This is what sends the stream to platforms like YouTube Live.

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm
- FFmpeg installed on your machine or in the Docker environment
- A browser with media capture support
- A valid RTMP stream URL from a live platform

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Deep-Saha1925/STREAMYARD-CLONE.git
cd STREAMYARD-CLONE
```

2. Install dependencies:

```bash
npm install
```

3. Update the RTMP destination in `index.js`:

```js
`rtmp://a.rtmp.youtube.com/live2/your-stream-key`
```

Replace the current placeholder stream URL with your own YouTube Live or other RTMP endpoint.

## Run Locally

### Option 1: Run with Node

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Option 2: Run with Docker

```bash
docker compose up --build
```

Then visit:

```text
http://localhost:3000
```

## Usage

1. Open the app in your browser.
2. Allow camera and microphone access.
3. Click the "Start Streaming" button.
4. The app will begin sending the recorded media to the backend.
5. FFmpeg will encode and push the stream to your configured RTMP endpoint.

## Important Notes

- The stream target is currently hardcoded in `index.js`.
- For production usage, you should move this into an environment variable.
- This project is a demo/prototype and is not a full production-ready broadcasting platform.
- Browser permissions and network conditions can affect stream quality and reliability.

## Example Flow

```text
Browser camera/mic
        ↓
MediaRecorder
        ↓
Socket.IO binary stream
        ↓
Node.js server
        ↓
FFmpeg encoder
        ↓
RTMP live stream
```

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome. If you want to improve the project:

- Improve UI/UX
- Add stream controls and stop button
- Support multiple viewers or chat
- Move credentials and destinations to environment variables
- Add proper error handling and logging

## Disclaimer

This application is intended for learning and experimental streaming use. Live broadcasting requires a valid streaming platform account and a correct RTMP URL.
