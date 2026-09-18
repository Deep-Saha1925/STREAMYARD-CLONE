const startBtn = document.getElementById('startButton');
const stopBtn = document.getElementById('stopButton');
const userVideo = document.getElementById('localVideo');
const statusText = document.getElementById('statusText');
const liveIndicator = document.getElementById('liveIndicator');
const connectionState = document.getElementById('connectionState');

const state = {
    media: null,
    mediaRecorder: null,
    isStreaming: false
};

const socket = io();

const setStatus = (message, isLive = false) => {
    statusText.textContent = message;
    liveIndicator.style.opacity = isLive ? '1' : '0.5';
    connectionState.textContent = isLive ? 'Live' : 'Standby';
};

const setControls = () => {
    startBtn.disabled = state.isStreaming;
    stopBtn.disabled = !state.isStreaming;
    startBtn.classList.toggle('disabled', state.isStreaming);
    stopBtn.classList.toggle('disabled', !state.isStreaming);
};

startBtn.addEventListener('click', async () => {
    if (!state.media) {
        setStatus('Camera access required', false);
        return;
    }

    if (state.isStreaming) return;

    const mediaRecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        frameRate: 25
    });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
            socket.emit('binarystream', event.data);
        }
    };

    mediaRecorder.start(250);
    state.mediaRecorder = mediaRecorder;
    state.isStreaming = true;
    setControls();
    setStatus('Streaming', true);
});

stopBtn.addEventListener('click', () => {
    if (!state.mediaRecorder || !state.isStreaming) return;

    state.mediaRecorder.stop();
    state.isStreaming = false;
    setControls();
    setStatus('Stopped', false);
});

socket.on('connect', () => {
    setStatus('Connected', false);
    connectionState.textContent = 'Socket ready';
});

socket.on('disconnect', () => {
    setStatus('Disconnected', false);
    connectionState.textContent = 'Reconnect pending';
});

window.addEventListener('load', async () => {
    try {
        const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        state.media = media;
        userVideo.srcObject = media;
        setStatus('Ready', false);
        connectionState.textContent = 'Camera ready';
    } catch (error) {
        console.error('Error getting media devices:', error);
        setStatus('Permission denied', false);
        connectionState.textContent = 'Camera blocked';
    }
});
