// js/audio.js - Somente código relacionado a áudio extraído do index.html

let gbAudioContext;
function getAudioContext() {
    if (!gbAudioContext) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            gbAudioContext = new AudioContext();
        } catch (e) { console.error("Web Audio API não suportada:", e); }
    }
    return gbAudioContext;
}

function createSound(type) {
    return function play(volume = 0.1) {
        const audioCtx = getAudioContext();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') { audioCtx.resume().catch(e => console.error("Audio resume failed:", e)); }
        if (audioCtx.state !== 'running') { console.warn("AudioContext not running, cannot play sound."); return; }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        oscillator.connect(gainNode); gainNode.connect(audioCtx.destination);
        gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.005);
        let duration = 0.1;
        oscillator.type = 'square';
        if (type === 'tetrisMove') { duration = 0.03; oscillator.frequency.setValueAtTime(300, audioCtx.currentTime); gainNode.gain.linearRampToValueAtTime(volume * 0.8, audioCtx.currentTime + 0.01); }
        else if (type === 'tetrisRotate') { duration = 0.05; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(550, audioCtx.currentTime + 0.04); }
        else if (type === 'tetrisLand') { duration = 0.06; oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); gainNode.gain.linearRampToValueAtTime(volume * 1.2, audioCtx.currentTime + 0.02); }
        else if (type === 'tetrisLineClear') { duration = 0.3; oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(1200, audioCtx.currentTime + 0.3); }
        else if (type === 'tetrisTetrisClear') { duration = 0.5; oscillator.type = 'sawtooth'; oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(400, audioCtx.currentTime + duration); }
        else if (type === 'tetrisLevelUp') { duration = 0.4; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(500, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.2); }
        else if (type === 'gameOver') { duration = 1.0; oscillator.type = 'noise'; const filter = audioCtx.createBiquadFilter(); filter.type = 'lowpass'; filter.Q.value = 5; filter.frequency.value = 300; oscillator.connect(filter); filter.connect(gainNode); }
        else if (type === 'button') { duration = 0.05; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'start') { duration = 0.2; oscillator.type = 'square'; oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(392, audioCtx.currentTime + duration); }
        else if (type === 'pause') { duration = 0.1; oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(220, audioCtx.currentTime + duration); }
        else if (type === 'snakeEat') { duration = 0.08; oscillator.frequency.setValueAtTime(550, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'snakeDie') { duration = 0.5; oscillator.type = 'sawtooth'; oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + duration); }
        else if (type === 'jump') { duration = 0.1; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(200, audioCtx.currentTime + duration); }
        else if (type === 'land') { duration = 0.05; oscillator.frequency.setValueAtTime(200, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'coin') { duration = 0.15; oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(400, audioCtx.currentTime + duration); }
        else if (type === 'hurt') { duration = 0.2; oscillator.type = 'sawtooth'; oscillator.frequency.setValueAtTime(300, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + duration); }
        else if (type === 'win') { duration = 0.8; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(523, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(262, audioCtx.currentTime + duration); }
        else if (type === 'paddleHit') { duration = 0.04; oscillator.frequency.setValueAtTime(250, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'wallHit') { duration = 0.03; oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'brickHit') { duration = 0.06; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'brickBreak') { duration = 0.08; oscillator.type = 'triangle'; oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration); }
        else if (type === 'loseLife') { duration = 0.4; oscillator.type = 'sawtooth'; oscillator.frequency.setValueAtTime(200, audioCtx.currentTime); oscillator.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + duration); }
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration);
    };
}

const soundEffects = {
    buttonClick: createSound('button'), start: createSound('start'),
    gameOver: createSound('gameOver'), pause: createSound('pause'),
    tetrisMove: createSound('tetrisMove'), tetrisRotate: createSound('tetrisRotate'), tetrisLand: createSound('tetrisLand'),
    tetrisLineClear: createSound('tetrisLineClear'), tetrisTetrisClear: createSound('tetrisTetrisClear'), tetrisLevelUp: createSound('tetrisLevelUp'),
    snakeEat: createSound('snakeEat'), snakeDie: createSound('snakeDie'),
    jump: createSound('jump'), land: createSound('land'), coin: createSound('coin'), hurt: createSound('hurt'), win: createSound('win'),
    paddleHit: createSound('paddleHit'), wallHit: createSound('wallHit'), brickHit: createSound('brickHit'), brickBreak: createSound('brickBreak'), loseLife: createSound('loseLife')
};
