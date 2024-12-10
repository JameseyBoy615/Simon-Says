/*-------------------------------- Constants --------------------------------*/

const choices = ["red", "green", "blue", "yellow"];

/*-------------------------------- Variables --------------------------------*/

let pattern = [];
let round = 1;
let playerPattern = [];
let computerPattern = [];
let newPlayerPattern = [];
let newComputerPattern = [];
let msg = "";

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector("#message");
const highScoreEl = document.querySelector("#high-score");
/*-------------------------------- Functions --------------------------------*/

const getPlayerPattern = (event) => {
  playerPattern.push(event.target.id);
  newPlayerPattern = [...playerPattern];
};

const getComputerPattern = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerPattern.push(choices[randomIndex]);
  newComputerPattern = [...computerPattern];
};

const comparePatterns = () => {
  if (newPlayerPattern.join(",") === newComputerPattern.join(",")) {
    // nextRound();
    msg = "you did it!";
  } else if (newPlayerPattern.join(",") !== newComputerPattern.join(",")) {
    msg = `Oops wrong color! You final score: ${round}`;
  }
};

const render = () => {
  messageEl.innerText = msg;
};

const play = (event) => {
  getPlayerPattern(event);
  getComputerPattern();
  comparePatterns();
  console.log("P:", newPlayerPattern);
  console.log("C:", newComputerPattern);
  render();
};

// const nextRound = () => {};

const reset = () => {
  pattern = [];
  round = 1;
  playerPattern = [];
  computerPattern = [];
  newPlayerPattern = [];
  newComputerPattern = [];
  msg = "";
  messageEl.innerText = `round: ${round}`;
};
/*----------------------------- Event Listeners -----------------------------*/
document.querySelector("#red").addEventListener("click", play);
document.querySelector("#green").addEventListener("click", play);
document.querySelector("#blue").addEventListener("click", play);
document.querySelector("#yellow").addEventListener("click", play);
document.querySelector("#reset-button").addEventListener("click", reset);
