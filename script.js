const CLUBS = [
  "AFC Bournemouth",
  "Arsenal",
  "Aston Villa",
  "Brentford",
  "Brighton & Hove Albion",
  "Burnley",
  "Chelsea",
  "Crystal Palace",
  "Everton",
  "Fulham",
  "Hull City",
  "Ipswich Town",
  "Leeds United",
  "Leicester City",
  "Liverpool",
  "Manchester City",
  "Manchester United",
  "Newcastle United",
  "Nottingham Forest",
  "Southampton",
  "Sunderland",
  "Tottenham Hotspur",
  "West Ham United",
  "Wolverhampton Wanderers"
];

const picker = document.getElementById("club-picker");
const pickScreen = document.getElementById("pick-screen");
const game = document.getElementById("game");
const clubName = document.getElementById("club-name");
const kitDisplay = document.getElementById("kit-display");
const slider = document.getElementById("season-slider");
const seasonLabel = document.getElementById("season-label");
const roundEl = document.getElementById("round");
const scoreEl = document.getElementById("score");
const guessArea = document.getElementById("guess-area");
const lockButton = document.getElementById("lock-btn");
const nextButton = document.getElementById("next-btn");
const result = document.getElementById("result");

let currentClub = null;
let currentKit = null;
let round = 0;
let score = 0;

// Turn a slider position (0 to 34) into a season label like "2009/10"
function seasonFromIndex(i) {
  const year = 1992 + Number(i);
  return year + "/" + String((year + 1) % 100).padStart(2, "0");
}

// Build the club buttons
CLUBS.forEach(function (club) {
  const btn = document.createElement("button");
  btn.textContent = club;
  btn.className = "club-btn";
  btn.addEventListener("click", function () {
    startGame(club);
  });
  picker.appendChild(btn);
});

function startGame(club) {
  currentClub = club;
  round = 0;
  score = 0;
  clubName.textContent = club;
  roundEl.textContent = round;
  scoreEl.textContent = score;
  pickScreen.classList.add("hidden");
  game.classList.remove("hidden");
  showRandomKit();
}

function showRandomKit() {
  const clubKits = KITS.filter(function (k) {
    return k.team === currentClub;
  });

  currentKit = null;
  result.classList.add("hidden");
  nextButton.classList.add("hidden");
  slider.disabled = false;
  lockButton.disabled = false;

  if (clubKits.length === 0) {
    kitDisplay.textContent = "No kits added for " + currentClub + " yet.";
    guessArea.classList.add("hidden");
    return;
  }

  guessArea.classList.remove("hidden");
  currentKit = clubKits[Math.floor(Math.random() * clubKits.length)];
  round++;
  roundEl.textContent = round;
  slider.value = 17;
  seasonLabel.textContent = seasonFromIndex(slider.value);

  kitDisplay.textContent = "";
  const img = document.createElement("img");
  img.src = currentKit.image;
  img.alt = "Football kit to guess";
  img.className="kit-photo";
  kitDisplay.appendChild(img);
}

lockButton.addEventListener("click", function () {
  if (!currentKit) {
    return;
  }

  const guess = seasonFromIndex(slider.value);
  const correct = guess === currentKit.season;
  if (correct) {
    score++;
    scoreEl.textContent = score;
  }

  result.textContent = correct
    ? "Correct! This kit is from " + currentKit.season + "."
    : "Not quite. This kit is from " + currentKit.season + ".";
  result.classList.remove("hidden");
  slider.disabled = true;
  lockButton.disabled = true;
  nextButton.classList.remove("hidden");
});

nextButton.addEventListener("click", showRandomKit);

// Update the big season number as the slider moves
slider.addEventListener("input", function () {
  seasonLabel.textContent = seasonFromIndex(slider.value);
});

// Go back to the club list
document.getElementById("change-btn").addEventListener("click", function () {
  game.classList.add("hidden");
  pickScreen.classList.remove("hidden");
});