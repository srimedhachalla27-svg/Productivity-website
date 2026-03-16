// Stats
let sessions = 0;
let miles = 0;

// Progress
let progress = 0; // percentage
let destinations = ["Tokyo", "Paris", "Rome", "Dubai"];
let currentDestIndex = 0;

// Travel Cards
let cards = [];

// Plane animation
const plane = document.getElementById("plane");
const progressBar = document.getElementById("progress");
const destinationName = document.getElementById("destination-name");
const cardsContainer = document.getElementById("cards-container");

function startFocus(minutes) {
  alert(`Focus session started for ${minutes} minutes!`);

  // Calculate miles
  let earnedMiles = minutes * 2;

  setTimeout(() => {
    sessions++;
    miles += earnedMiles;

    // Update stats
    document.getElementById('sessions').innerText = `Sessions: ${sessions}`;
    document.getElementById('miles').innerText = `Miles Earned: ${miles}`;

    // Increase progress
    progress += earnedMiles / 2; // arbitrary scaling
    if (progress >= 100) {
      progress = 0;
      unlockDestination();
    }

    // Update progress bar
    progressBar.style.width = progress + "%";

    // Move plane across screen (animation)
    let pos = 0;
    let id = setInterval(frame, 10);
    function frame() {
      if (pos >= 90) {
        clearInterval(id);
        plane.style.left = "0px"; // reset
      } else {
        pos++;
        plane.style.left = pos + "%";
      }
    }

    alert(`Focus session complete! You earned ${earnedMiles} miles!`);
  }, minutes * 60000); // real-time minutes
}

// Unlock travel cards
function unlockDestination() {
  currentDestIndex++;
  if (currentDestIndex >= destinations.length) currentDestIndex = 0;
  destinationName.innerText = destinations[currentDestIndex];

  // Unlock card
  let cardName = destinations[currentDestIndex] + " Card";
  cards.push(cardName);

  // Display card
  const cardDiv = document.createElement("div");
  cardDiv.textContent = cardName;
  cardDiv.style.background = "#2563eb";
  cardDiv.style.padding = "5px 10px";
  cardDiv.style.borderRadius = "6px";
  cardsContainer.appendChild(cardDiv);
}
