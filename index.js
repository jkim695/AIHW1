// DOM elements for buttons and game display
const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll"); 

// DOM elements for player turn and score displays
const playerTurnIndicator = document.getElementById("player-turn"); 
const playerScores = [
  document.getElementById("p1-score"),
  document.getElementById("p2-score") 
];
const playerTurnTotals = [
  document.getElementById("p1-hold"), 
  document.getElementById("p2-hold")
];
const dieDisplay = document.getElementById("die");

// Game state variables
let scores = [0, 0]; 
let turnTotals = [0, 0]; 
let currentPlayer = 0;
let gameEnded = false;

// Event listeners for buttons
holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll); 

// Function to initialize or reset the game
function initializeGame() {
  scores = [0, 0];
  turnTotals = [0, 0];
  currentPlayer = 0;
  gameEnded = false;
  updateUI();  
  enableButtons();
}

// Function to handle rolling the die
function roll() {
  if (gameEnded) return;
  const faceValue = Math.floor(Math.random() * 6) + 1;
  
  // Update die display
  const output = "&#x268" + (faceValue - 1) + "; ";
  dieDisplay.innerHTML = output;
  
  // Check the result of the roll
  if (faceValue === 1) {
    turnTotals[currentPlayer] = 0;
    switchTurn();
  } else {
    turnTotals[currentPlayer] += faceValue;    
    if (scores[currentPlayer] + turnTotals[currentPlayer] >= 100) {
      hold(); 
    }
  }
  
  updateUI();
}

// Function to handle holding the current turn score
function hold() {
  if (gameEnded) return;
  
  // Add the current turn total to the player's overall score
  scores[currentPlayer] += turnTotals[currentPlayer];
  
  // Reset the current turn total
  turnTotals[currentPlayer] = 0;
  
  // Check if the current player has won the game
  if (scores[currentPlayer] >= 100) {
    endGame();
  } else {
    switchTurn();
  }
  
  updateUI();
}

// Function to switch turns between players
function switchTurn() {
  currentPlayer = 1 - currentPlayer;
}

// Function to end the game and display the winner
function endGame() {
  gameEnded = true;
  
  // Highlight the winning player's score display
  playerScores[currentPlayer].style.backgroundColor = "green";
  playerScores[currentPlayer].innerText = "100 🎉";
  playerScores[currentPlayer].style.width = "100%";
  playerScores[currentPlayer].style.textAlign = "center";
  playerScores[currentPlayer].style.fontWeight = "bold"; 
  playerScores[currentPlayer].style.color = "white";
  
  // Clear the losing player's turn total display
  playerTurnTotals[currentPlayer].style.width = "0%";
  playerTurnTotals[currentPlayer].innerText = ""; 
  
  disableButtons();
}

// Function to disable the roll and hold buttons
function disableButtons() {
  rollBtn.disabled = true;
  holdBtn.disabled = true;
}

// Function to enable the roll and hold buttons
function enableButtons() {
  rollBtn.disabled = false;
  holdBtn.disabled = false;
}

// Function to update the game UI after any action
function updateUI() {
  if (gameEnded) return;
  
  // Update the player score displays
  playerScores[0].innerText = scores[0];
  playerScores[1].innerText = scores[1];
  playerScores[0].style.width = `${scores[0]}%`;
  playerScores[1].style.width = `${scores[1]}%`;
  
  // Update the current turn total displays
  playerTurnTotals[0].innerText = turnTotals[0] === 0 ? "" : turnTotals[0];
  playerTurnTotals[1].innerText = turnTotals[1] === 0 ? "" : turnTotals[1];
  playerTurnTotals[0].style.width = `${turnTotals[0]}%`;
  playerTurnTotals[1].style.width = `${turnTotals[1]}%`;
  
  // Update the turn indicator to show the current player
  playerTurnIndicator.innerText = `Player-${currentPlayer + 1}'s Turn`;
}

window.onload = initializeGame;
