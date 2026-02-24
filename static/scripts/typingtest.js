const textarea = document.querySelector("textarea");
const targetText = document.querySelector("#testText").innerText.trim();
const submitBtn = document.querySelector("#submitBtn");

let startTime = null;
let interval = null;
let submitted = false;

function updateStats() {
  const typedText = textarea.value;
  const timeElapsed = (Date.now() - startTime) / 1000 / 60;

  const wordsTyped = typedText.trim().split(/\s+/).filter(Boolean).length;
  const correctChars = typedText.split("").filter((ch, i) => ch === targetText[i]).length;

  const wpm = Math.round(wordsTyped / timeElapsed);
  const accuracy = Math.round((correctChars / typedText.length) * 100) || 100;

  document.querySelector("#wpm").textContent = isNaN(wpm) ? 0 : wpm;
  document.querySelector("#accuracy").textContent = `${accuracy}%`;
  document.querySelector("#chars").textContent = typedText.length;

  return { wpm, accuracy, characters: typedText.length };
}

async function submitToBackend() {
  if (submitted) return;
  const name = prompt("Enter your name:");
  if (!name) return;

  const stats = updateStats();

  await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, ...stats })
  });

  alert("Result submitted!");
  submitted = true;
}

textarea.addEventListener("input", () => {
  if (!startTime) {
    startTime = Date.now();
    interval = setInterval(updateStats, 500);
  }

  updateStats();

  if (textarea.value.length >= targetText.length && !submitted) {
    clearInterval(interval);
    submitToBackend();
  }
});

document.querySelector("#restartBtn").addEventListener("click", () => {
  textarea.value = "";
  startTime = null;
  submitted = false;
  document.querySelector("#wpm").textContent = 0;
  document.querySelector("#accuracy").textContent = "100%";
  document.querySelector("#chars").textContent = 0;
});

submitBtn.addEventListener("click", () => {
  clearInterval(interval);
  submitToBackend();
});
