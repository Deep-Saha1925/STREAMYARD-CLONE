const startBtn = document.getElementById('startButton');
const userVideo = document.getElementById('localVideo');

window.addEventListener('load', async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    userVideo.srcObject = media;
})
