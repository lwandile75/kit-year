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

let currentClub = null;
let currentKit = null;
let round = 0;

// Turn a slider position (0 to 33) into a season label like "2009/10"
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
  clubName.textContent = club;
  pickScreen.classList.add("hidden");
  game.classList.remove("hidden");
  showRandomKit();
}

function showRandomKit() {
  const clubKits = KITS.filter(function (k) {
    return k.team === currentClub;
  });

  if (clubKits.length === 0) {
    kitDisplay.textContent = "No kits added for " + currentClub + " yet.";
    return;
  }

  currentKit = clubKits[Math.floor(Math.random() * clubKits.length)];
  round++;
  roundEl.textContent = round;

  // Simple kit for now: a coloured box with the sponsor and maker
  kitDisplay.textContent = "";
  const box = document.createElement("div");
  box.style.background = currentKit.primary;
  box.style.color = "#fff";
  box.style.padding = "60px 40px";
  box.style.borderRadius = "8px";
  box.style.textAlign = "center";
  box.textContent = currentKit.sponsor + " | " + currentKit.manufacturer + " | " + currentKit.type;
  kitDisplay.appendChild(box);
}

// Update the big season number as the slider moves
slider.addEventListener("input", function () {
  seasonLabel.textContent = seasonFromIndex(slider.value);
});

// Go back to the club list
document.getElementById("change-btn").addEventListener("click", function () {
  game.classList.add("hidden");
  pickScreen.classList.remove("hidden");
});