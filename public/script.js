const startBtn = document.getElementById('startButton');
const userVideo = document.getElementById('userVideo');

window.addEventListener('load', async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    userVideo.srcObject = media;
})
