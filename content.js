// إنشاء عنصر التايمر
const timerContainer = document.createElement("div");
timerContainer.id = "custom-timer";
timerContainer.style.position = "fixed";
timerContainer.style.top = "10px";
timerContainer.style.right = "10px";
timerContainer.style.backgroundColor = "#333";
timerContainer.style.color = "#fff";
timerContainer.style.padding = "10px";
timerContainer.style.borderRadius = "5px";
timerContainer.style.zIndex = "9999";

document.body.appendChild(timerContainer);

// بدء التايمر
let seconds = 0;
function updateTimer() {
  seconds++;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  timerContainer.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

setInterval(updateTimer, 1000);
