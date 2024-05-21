const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const resetBtn = document.querySelector('.reset-btn');
const display = document.querySelector('.display');
const lapsList = document.querySelector('.laps ul');

let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let laps = [];

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
        intervalId = setInterval(updateTime, 10);
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        clearInterval(intervalId);
        recordLap();
    }
}

function resetTimer() {
    if (isRunning) {
        stopTimer();
    }
    elapsedTime = 0;
    clearInterval(intervalId);
    display.textContent = "00:00:00.000";
    laps = [];
    lapsList.innerHTML = "";
}

function updateTime() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        display.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
    }
}

function recordLap() {
    laps.push(elapsedTime);
    const lapTime = new Date(elapsedTime).toISOString().slice(14, -5);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(li);
}
