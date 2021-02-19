"use strict";

// VARIABLES

const arr = ["Rock", "Paper", "Scissors"];
let playerScore = 0;
let computerScore = 0;
let choice;
const options = document.querySelectorAll(".btn");
const resultLabel = document.querySelector(".result-label");
const finalScore = document.querySelector(".final-score");
const playerScoreLabel = document.querySelector(".player-score");
const computerScoreLabel = document.querySelector(".computer-score");
const btnReplay = document.querySelector(".replay");

// FUNCTIONS

// Computer play function
function computerPlay() {
  // Generate a random number from 0 to 2
  choice = Math.floor(Math.random() * 2) + 1;
  // use the random number to return a choice
  return arr[choice];
}

// Main game function that decides the winner
function playRound(e) {
  // Get computer & user's play
  const computerChoice = computerPlay();
  const userChoice = e.target.name;

  if (computerChoice === userChoice) {
    displayResults("It's a tie!");
  } else if (
    (computerChoice === "Rock" && userChoice === "Scissors") ||
    (computerChoice === "Scissors" && userChoice === "Paper") ||
    (computerChoice === "Paper" && userChoice === "Rock")
  ) {
    computerScore++;
    // Grammer nazi stuff
    displayResults(
      `You Lose! ${computerChoice} ${
        computerChoice === "Scissors" ? "beat" : "beats"
      } ${userChoice}`
    );
    updateScore(computerScore, computerScoreLabel);
  } else {
    playerScore++;
    displayResults(
      `You Win! ${userChoice} ${
        userChoice === "Scissors" ? "beat" : "beats"
      } ${computerChoice}`
    );
    updateScore(playerScore, playerScoreLabel);
  }
}

// Display result of each round
function displayResults(result) {
  resultLabel.textContent = result;
}

// Update score after each round & check for winner
function updateScore(score, scoreLabel) {
  if (score <= 5) {
    scoreLabel.textContent = `${score}`;
  }
  if (score === 5) {
    finalScore.textContent = `The final score is: 
    Player: ${playerScore}
    Computer: ${computerScore}`;

    // Hide current scores
    document
      .querySelectorAll(".score")
      .forEach((label) => label.classList.add("hidden"));

    // Remove button event handlers so you can't still play on
    options.forEach((btn) => btn.removeEventListener("click", playRound));

    // replay button visible after game ends
    btnReplay.classList.remove("hidden");

    // Change background color when game ends
    document.querySelector("body").classList.add("game-over");
    // document.querySelector("body").style.color = "white";
  }
}

// function to initialize the game
function init() {
  // initialize scores & labels
  playerScore = 0;
  computerScore = 0;
  resultLabel.textContent = "";
  finalScore.textContent = "";
  playerScoreLabel.textContent = "0";
  computerScoreLabel.textContent = "0";

  // Hide replay button
  btnReplay.classList.add("hidden");

  // Unhide hidden elements
  document
    .querySelectorAll(".score")
    .forEach((label) => label.classList.remove("hidden"));

  // set background color back to normal
  document.querySelector("body").classList.remove("game-over");

  // Event listeners for choice buttons
  options.forEach((btn) => btn.addEventListener("click", playRound));
}

// EVENT LISTENERS

// Restart the game when clicked on replay button
btnReplay.addEventListener("click", init);

// MAIN FUNCTION CALL
init();
