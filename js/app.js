/*-------------------------------- Constants --------------------------------*/

const choices = ["red", "green", "blue", "yellow"];

/*-------------------------------- Variables --------------------------------*/

let round = 1;
let playerPattern = [];
let computerPattern = [];
let msg = "";
let highScore = 0;

/*------------------------ Cached Element References ------------------------*/
const messageEl = document.querySelector("#message");
const highScoreEl = document.querySelector("#high-score");
const buttons = document.querySelectorAll(".game-button");
/*-------------------------------- Functions --------------------------------*/

const flashButton = (choice) => {
  const button = document.getElementById(choice);
  const tone = document.getElementById(`${choice}-audio`);
  button.classList.add("active");
  tone.volume = 1;
  tone.currentTime = 0;
  tone.play();
  if (round >= 10) {
    setTimeout(() => {
      button.classList.remove("active");
    }, 300);
  } else {
    setTimeout(() => {
      button.classList.remove("active");
    }, 500);
  }
};

const flashPattern = () => {
  computerPattern.forEach((choice, index) => {
    if (round >= 10) {
      setTimeout(() => {
        flashButton(choice);
      }, 400 * index);
    } else if (round >= 5) {
      setTimeout(() => {
        flashButton(choice);
      }, 600 * index);
    } else {
      setTimeout(() => {
        flashButton(choice);
      }, 800 * index);
    }
  });
};

const getComputerPattern = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerPattern.push(choices[randomIndex]);
};

const nextRound = () => {
  playerPattern = [];
  round += 1;
  msg = `Round: ${round}`;
  render();
  getComputerPattern();
  flashPattern();
};

const checkHighScore = () => {
  if (round - 1 > highScore) {
    highScoreEl.innerText = `Highest Round: ${round - 1}`;
    highScore = round;
  }
};

const comparePatterns = () => {
  const currentChoice = playerPattern.length - 1;

  if (playerPattern[currentChoice] !== computerPattern[currentChoice]) {
    const wrongTone = document.getElementById("wrong-audio");
    wrongTone.volume = 0.005;
    wrongTone.play();
    msg = `Oops wrong color! Your final score: ${round - 1}`;
    checkHighScore();
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

// <-------------------------- GraveYard ------------------------------>

//one way to add logic?????
// 1.create a loop that runs through computerPattern Array
// 2.change css of buttons for player to mimic
// 3. set a delay after computer pattern to establish
// players by possibly using setTimeout()
