let score = 0;
let streak = 0;
let currentGame = '';
let currentWord = '';
let synonyms = {
  fast: ['quick', 'rapid', 'swift'],
  happy: ['joyful', 'cheerful', 'content'],
  big: ['large', 'huge', 'giant'],
};
let typingChallenges = [
  'Typing is fun and fast!',
  'Speed is the key to success.',
  'Accuracy matters more than speed.',
];

const gameArea = document.getElementById("game-area");
const gameInput = document.getElementById("game-input");
const result = document.getElementById("game-result");
const scoreDisplay = document.getElementById("score-display");

function updateScore(isCorrect) {
  if (isCorrect) {
    score++;
    streak++;
  } else {
    streak = 0;
  }
  scoreDisplay.textContent = `Score: ${score} | Streak: ${streak}`;
}

// === Word Unscramble ===
function startUnscrambleGame() {
  currentGame = "unscramble";
  const words = ["python", "keyboard", "function", "variable", "developer", "macbook"];
  currentWord = words[Math.floor(Math.random() * words.length)];
  const scrambled = currentWord.split("").sort(() => 0.5 - Math.random()).join("");

  gameArea.innerHTML = `<p>Unscramble this word: <strong>${scrambled}</strong></p>`;
  gameInput.innerHTML = `
    <input type="text" id="guess" placeholder="Your guess"/>
    <button onclick="submitAnswer()">Submit</button>
  `;
  result.textContent = "";
}

// === Synonym Match ===
function startSynonymGame() {
  currentGame = "synonym";
  const words = Object.keys(synonyms);
  currentWord = words[Math.floor(Math.random() * words.length)];

  gameArea.innerHTML = `<p>Type a synonym for: <strong>${currentWord}</strong></p>`;
  gameInput.innerHTML = `
    <input type="text" id="guess" placeholder="Synonym"/>
    <button onclick="submitAnswer()">Submit</button>
  `;
  result.textContent = "";
}

// === Typing Challenge ===
function startTypingChallenge() {
  currentGame = "challenge";
  currentWord = typingChallenges[Math.floor(Math.random() * typingChallenges.length)];

  gameArea.innerHTML = `<p>Type this sentence exactly:</p><blockquote>${currentWord}</blockquote>`;
  gameInput.innerHTML = `
    <textarea id="guess" rows="3"></textarea>
    <button onclick="submitAnswer()">Submit</button>
  `;
  result.textContent = "";
}

// === Answer Handler ===
function submitAnswer() {
  const guessInput = document.getElementById("guess");
  const guess = guessInput ? guessInput.value.trim().toLowerCase() : "";
  let correct = false;

  if (currentGame === "unscramble") {
    correct = guess === currentWord;
  } else if (currentGame === "synonym") {
    correct = synonyms[currentWord].includes(guess);
  } else if (currentGame === "challenge") {
    correct = guess === currentWord.toLowerCase();
  }

  result.textContent = correct ? "✅ Correct!" : "❌ Try again!";
  updateScore(correct);

  setTimeout(() => {
    if (currentGame === "unscramble") startUnscrambleGame();
    else if (currentGame === "synonym") startSynonymGame();
    else if (currentGame === "challenge") startTypingChallenge();
  }, 1500);
}

// === Attach Events ===
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-unscramble").addEventListener("click", startUnscrambleGame);
  document.getElementById("btn-synonym").addEventListener("click", startSynonymGame);
  document.getElementById("btn-challenge").addEventListener("click", startTypingChallenge);
});
