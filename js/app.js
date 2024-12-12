/*-------------------------------- Constants --------------------------------*/

const choices = ["red", "green", "blue", "yellow"];

/*-------------------------------- Variables --------------------------------*/

let round = 1;
let playerPattern = [];
let computerPattern = [];
let msg = "";

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector("#message");
const highScoreEl = document.querySelector("#high-score");
const buttons = document.querySelectorAll(".game-button");
/*-------------------------------- Functions --------------------------------*/

const flashButton = (choice) => {
  const button = document.getElementById(choice);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 500);
};

const flashPattern = () => {
  computerPattern.forEach((choice, index) => {
    setTimeout(() => {
      flashButton(choice);
    }, 800 * index);
  });
};

const getComputerPattern = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerPattern.push(choices[randomIndex]);
};

const nextRound = () => {
  playerPattern = [];
  round += 1;
  msg = `round: ${round}`;
  render();
  getComputerPattern();
  flashPattern();
};

const comparePatterns = () => {
  const currentChoice = playerPattern.length - 1;

  if (playerPattern[currentChoice] !== computerPattern[currentChoice]) {
    msg = `Oops wrong color! Your final score: ${round}`;
    render();
    return false;
  }

  if (playerPattern.length === computerPattern.length) {
    setTimeout(nextRound, 1000);
    return true;
  }
};

const getPlayerPattern = (event) => {
  const choice = event.target.id;
  flashButton(choice);
  playerPattern.push(choice);
  if (comparePatterns() === false) {
    return;
  }
};

const render = () => {
  messageEl.innerText = msg;
};

const reset = () => {
  round = 1;
  playerPattern = [];
  computerPattern = [];
  msg = `Round: ${round}`;
  render();
  getComputerPattern();
  flashPattern();
};

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
  button.addEventListener("click", getPlayerPattern);
});

document.querySelector("#reset-button").addEventListener("click", reset);

//one way to add logic?????
// 1.create a loop that runs through computerPattern Array
// 2.change css of buttons for player to mimic
// 3. set a delay after computer pattern to establish
// players by possibly using setTimeout()
