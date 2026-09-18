const startBtn = document.getElementById('startButton');
const userVideo = document.getElementById('localVideo');

const state = { media: null }
const socket = io()

startBtn.addEventListener('click', async () => {
    const mediaRecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        frameRate: 25
    })

    mediaRecorder.ondataavailable = (event) => {
        socket.emit('binarystream', event.data)
    }

    mediaRecorder.start();
})

window.addEventListener('load', async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    state.media = media;
    userVideo.srcObject = media;
})
