const body = document.querySelector("body");
const container = document.querySelector(".gameContainer");

let newColors = [
  { color: "bluePeg", letter: "B" },
  { color: "magentaPeg", letter: "M" },
  { color: "greenPeg", letter: "G" },
  { color: "orangePeg", letter: "O" },
  { color: "whitePeg", letter: "W" },
  { color: "redPeg", letter: "R" }
];

let pegBoard = [];
let masterCodeValues = [];
let feedbackMatrix = [];

const boardRows = 9;
let boardCells = 0;

let currentTurn = boardRows;
let currentColor;
let currentRow;
let keyCounter = 0;
let playerInitials = "Player";

class Pegs {
  constructor(id, color, match = 0) {
    this.color = color;
    this.id = id;
    // match 0 = no match, 1 = color match, 2 = color and location match
    this.match = match;
  }
}

class MasterCode {
  constructor(color) {
    this.color = color;
    this.match = false;
  }
}

function createBoardAndPegBoardObj() {
  for (let x = 0; x <= boardRows; x++) {
    let row = document.createElement("div");
    row.classList.add("row", "js-row" + x);
    if (boardCells === 5) {
      row.classList.add("rowHard");
      container.classList.add("containerHard");
    }
    container.appendChild(row);
    let rowArr = [];

    for (let y = 0; y <= boardCells; y++) {
      // create the html elements
      let newDiv = document.createElement("div");
      newDiv.classList.add("emptyPeg");
      newDiv.id = "" + x + y;
      row.appendChild(newDiv);
      // push the new object to the row array
      let newPeg = new Pegs("" + x + y);
      rowArr.push(newPeg);
    }
    pegBoard.push(rowArr);
  }
}

function showInstructions(stage) {
  let genericFeedbackInstructions = `<p><div class="feedbackPegFull" style="position:relative; top:2px; float: left;"></div>For each black peg, one of your guesses was the correct color and location.<br><div class="feedbackPegHalf" style="position:relative; top:3px; float: left;"></div>For each white peg, one of your guesses was the correct color but wrong location.</p>`;
  let instructions = document.createElement("div");
  switch (stage) {
    case 0:
      let instructions = document.createElement("div");
      instructions.classList.add(
        "instructions",
        "card-panel",
        "blue-grey",
        "lighten-3"
      );
      instructions.innerHTML = `<h6>The mastermind has selected a secret code. You can make ${boardRows + 1} guesses!</h6><p>Start by selecting a color and placing it in the highlighted row.</p>`;
      instructions.offsetWidth = instructions.offsetWidth
      container.appendChild(instructions);
      break;
    case 1:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h6>You're on the right track!</h6>${genericFeedbackInstructions}`;
      break;
    case 2:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h6>You're so close!</h6>${genericFeedbackInstructions}`;
      break;
    case 3:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h6>None of your guesses match the master code. Make another guess!</h6>`;
      break;
    case 4:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h5>Better luck next time!</h5>`;
      break;
    case 5:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h5>Congrats, you beat the mastermind!</h5>`;
      break;
    case 6:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h5>Last turn!<br>You can do this.</h5><p>Go over the feedback from your previous guesses, and when you're ready, lock in that final guess.`;
  }
}

function runCheckGuessButton() {
  let activePegs = document.querySelectorAll(".activePeg");
  // i think there's a better way to do this
  if (activePegs.length != 0) {
    Materialize.toast(`Looks like you're missing a guess.`, 2000);
  } else {
    checkGuess(currentTurn);
  }
}

function createPaintCan() {
  let paintCan = document.createElement("div");
  paintCan.classList.add("paintCan", "js-paintCan");
  for (let i = 0; i < newColors.length; i++) {
    let paintBrush = document.createElement("div");
    paintBrush.classList.add("paintBrush", newColors[i].color);
    paintBrush.id = newColors[i].color;
    paintBrush.innerHTML = `${newColors[i].letter}`;
    paintBrush.addEventListener("click", highlightPaintCan);
    paintCan.appendChild(paintBrush);
  }
  container.appendChild(paintCan);
  if (newColors.length === 4) {
    paintCan.classList.add("paintCanEasy");
    document.querySelector(".greenPeg").classList.add("paintBrushEasy");
    document.querySelector(".orangePeg").classList.add("paintBrushEasy");
  }
}

function createGuessButton() {
  let guessButton = document.createElement("button");
  guessButton.classList.add(
    "guessButton",
    "waves-effect",
    "waves-light",
    "btn",
    "blue-grey",
    "darken-2"
  );
  guessButton.textContent = "Guess";
  guessButton.addEventListener("click", runCheckGuessButton);
  document.querySelector(".js-paintCan").appendChild(guessButton);
}

function assignPaintColor(evt) {
  let id = evt.target.id;
  evt.target.classList.remove(
    "whitePeg",
    "magentaPeg",
    "orangePeg",
    "bluePeg",
    "redPeg",
    "greenPeg",
    "activePeg",
    "emptyPeg"
  );
  pegBoard[id[0]][id[1]].color = currentColor;
  // solving for edge case when user clicks peg before selecting color
  if (currentColor != undefined) {
    evt.target.classList.add(currentColor);
  }
}

function makePegRowKeyboardActive() {
  document.addEventListener("keydown", assignKeyboardPainter);
}

// thanks w3schools for this key listener switch example!
function assignKeyboardPainter(evt) {
  if (evt.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (evt.keyCode) {
    case 66:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("bluePeg");
      pegBoard[currentTurn][keyCounter].color = "bluePeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 77:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("magentaPeg");
      pegBoard[currentTurn][keyCounter].color = "magentaPeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 71:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("greenPeg");
      pegBoard[currentTurn][keyCounter].color = "greenPeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 79:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("orangePeg");
      pegBoard[currentTurn][keyCounter].color = "orangePeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 87:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("whitePeg");
      pegBoard[currentTurn][keyCounter].color = "whitePeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 82:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("redPeg");
      pegBoard[currentTurn][keyCounter].color = "redPeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 13:
      // if (game is not won)
      runCheckGuessButton();
      // else reset game
    default:
      return; // Quit when this doesn't handle the key event.
  }
  if (keyCounter > boardCells) {
    setTimeout(function() {
      if (keyCounter > boardCells) {
        Materialize.toast(`Press return to submit your guess.`, 2000);
      } else {
        clearTimeout()
      }
    }, 4000);
  }
  // evt.preventDefault();
}

function assignPegRowEventListeners(turn) {
  for (i = 0; i < pegBoard[0].length; i++) {
    let pegDiv = document.getElementById(pegBoard[turn][i].id);
    pegDiv.addEventListener("click", assignPaintColor);
  }
}

function removePegRowEventListeners(turn) {
  let oldTurn = turn + 1;
  // console.log("turning off previous listeners from", oldTurn);
  for (i = 0; i < pegBoard[0].length; i++) {
    let pegDiv = document.getElementById(pegBoard[oldTurn][i].id);
    pegDiv.removeEventListener("click", assignPaintColor);
    pegDiv.removeEventListener("keydown", assignKeyboardPainter);
  }
}

function highlightPaintCan(evt) {
  currentColor = evt.target.id;
  let allBrushes = document.querySelectorAll(".paintBrush");
  // omg turns out this is the only easy way to loop over a node list
  for (let brush of allBrushes) {
    brush.classList.remove("activePaintColor");
  }
  evt.target.classList.add("activePaintColor");
}

function createMasterCodes() {
  // https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
  let choices = newColors.length;
  let counter = boardCells + 1;
  for (i = 0; i < counter; i++) {
    while (counter > 0) {
      let index = Math.floor(Math.random() * choices);
      counter--;
      // swap the last element with it
      newColors[choices] = newColors[index];
      let masterCode = new MasterCode(newColors[index].color);
      masterCodeValues.push(masterCode);
    }
    // i picked a bad way to shuffle and this is how i pay for it
    newColors.pop();
  }
}

function appendMasterCodesDiv() {
  let masterCodeDiv = document.createElement("div");
  masterCodeDiv.classList.add(
    "masterCodeDiv",
    "card-panel",
    "blue-grey",
    "darken-2",
    "fade"
  );
  if (boardCells === 5) {
    masterCodeDiv.classList.add("masterCodeDivHard");
  }
  document.querySelector(".paintCan").style.display = "none";
  for (i = 0; i < masterCodeValues.length; i++) {
    let eachMasterCode = document.createElement("div");
    eachMasterCode.classList.add("masterCode");
    eachMasterCode.classList.add(masterCodeValues[i].color);
    masterCodeDiv.appendChild(eachMasterCode);
  }
  container.appendChild(masterCodeDiv);
}

function setMasterCodesFalse() {
  for (let i = 0; i < masterCodeValues.length; i++) {
    masterCodeValues[i].match = false;
  }
}

function createFeedbackDiv() {
  let feedbackWrapper = document.querySelector(".feedbackWrapper");
  for (i = 0; i <= boardRows; i++) {
    let feedbackRow = document.createElement("div");
    feedbackRow.classList.add("feedbackRow", i);
    if (boardCells === 5) {
      feedbackRow.classList.add("feedbackRowHard");
    }
    for (x = 0; x <= boardCells; x++) {
      let feedbackPeg = document.createElement("div");
      feedbackPeg.classList.add("feedbackPeg");
      feedbackPeg.id = "f" + i + x;
      feedbackRow.appendChild(feedbackPeg);
    }
    container.appendChild(feedbackRow);
  }
}

function makeFeedbackArray(turn) {
  for (let i = 0; i < pegBoard[turn].length; i++) {
    feedbackMatrix.push(pegBoard[turn][i].match);
    feedbackMatrix.sort();
  }
}

function checkScore() {
  let score = feedbackMatrix.reduce((a, b) => a + b);
  if (score === 8 && boardCells === 3) {
    console.log("you win");
    showInstructions(5);
    appendResetGameButton();
    appendMasterCodesDiv();
    document.removeEventListener("keydown", assignKeyboardPainter)
  } else if (score === 12 && boardCells === 5) {
    console.log("you win");
    showInstructions(5);
    appendResetGameButton();
    appendMasterCodesDiv();
    document.removeEventListener("keydown", assignKeyboardPainter)
  } else if (currentTurn < 1) {
    console.log("you lost");
    showInstructions(4);
    appendResetGameButton();
    appendMasterCodesDiv();
    document.removeEventListener("keydown", assignKeyboardPainter)
  } else if (currentTurn < 2) {
    printFeedback();
    showInstructions(6);
    nextTurn();
  } else if (score === 0) {
    printFeedback();
    showInstructions(3);
    nextTurn();
  } else if (score > 4 && boardCells === 3) {
    printFeedback();
    showInstructions(2);
    nextTurn();
  } else if (score > 7 && boardCells === 5) {
    printFeedback();
    showInstructions(2);
    nextTurn();
  } else if (score > 1) {
    printFeedback();
    showInstructions(1);
    nextTurn();
  } else {
    printFeedback();
    showInstructions(1);
    nextTurn();
  }
}

function printFeedback() {
  // get dom elements for current turn ('f' + x + i)
  // 'f' prepends the element id, x = current turn, i = element index
  for (i = 0; i <= boardCells; i++) {
    let feedbackPeg = document.getElementById(`f${currentTurn}${i}`);
    // console.log(`print ${feedbackMatrix[i]}`);
    switch (feedbackMatrix[i]) {
      case 0:
        break;
      case 1:
        feedbackPeg.offsetWidth = feedbackPeg.offsetWidth
        feedbackPeg.classList.add("feedbackPegHalf");
        feedbackPeg.classList.remove("feedbackPeg");
        break;
      case 2:
        feedbackPeg.offsetWidth = feedbackPeg.offsetWidth
        feedbackPeg.classList.remove("feedbackPeg");
        feedbackPeg.classList.add("feedbackPegFull");
    }
  }
}

function checkGuess(turn) {
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].color === masterCodeValues[i].color) {
      // console.log(pegBoard[turn][i].color,masterCodeValues[i].color,"full match")
      pegBoard[turn][i].match = 2;
      masterCodeValues[i].match = true;
    }
  }
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].match === 0) {
      for (let x = 0; x < masterCodeValues.length; x++) {
        if (
          pegBoard[turn][i].color === masterCodeValues[x].color &&
          masterCodeValues[x].match === false &&
          pegBoard[turn][i].match === 0
        ) {
          pegBoard[turn][i].match = 1;
          masterCodeValues[x].match = true;
        }
      }
    }
  }
  makeFeedbackArray(currentTurn);
  keyCounter = 0;
  checkScore();
}

function appendResetGameButton() {
  let resetGameButton = document.createElement("a");
  resetGameButton.classList.add(
    "reset-game-btn",
    "waves-effect",
    "waves-light",
    "btn-large",
    "blue-grey",
    "darken-2"
  );
  resetGameButton.innerHTML = `<i class="material-icons left">replay</i>Again!`;
  document.querySelector(".instructions").appendChild(resetGameButton);
  resetGameButton.addEventListener("click", resetGame);
}

function nextTurn() {
  feedbackMatrix = [];
  currentTurn--;
  currentRow = document.querySelectorAll(`.row`)[currentTurn];
  setMasterCodesFalse();
  applyActivePegStyle();
  // reassign the event listeners
  removePegRowEventListeners(currentTurn);
  assignPegRowEventListeners(currentTurn);
  makePegRowKeyboardActive(currentTurn);
}

function setPlayerNameAndDifficulty(evt) {
  evt.preventDefault();
  let difficulty = document.querySelector('input[name="difficulty"]:checked')
    .id;
  console.log(difficulty);
  setDifficultyLevel(difficulty);
  playerInitials = document
    .querySelector(".playerInitials")
    .value.toUpperCase();
  printPlayerName();
}

function printPlayerName() {
  let playerName = document.createElement("div");
  playerName.classList.add("playerInitials");
  if (playerInitials != "") {
    playerName.textContent = `Welcome, ${playerInitials}`;
  } else {
    playerName.textContent = `Welcome, player`;
  }
  container.appendChild(playerName);
}

function modalForm() {
  let form = document.querySelector("form");
  let nameInput = document.querySelector(".playerInitials");
  document.getElementById("input_text").focus();
  form.addEventListener("submit", setPlayerNameAndDifficulty);
}

function applyActivePegStyle() {
  for (i = 0; i <= boardCells; i++) {
    let activePeg = currentRow.children[i];
    activePeg.classList.add("activePeg");
  }
}

function setDifficultyLevel(diff) {
  switch (diff) {
    case "easy":
      boardCells = 3;
      newColors.pop();
      newColors.pop();
      break;
    case "normal":
      boardCells = 3;
      break;
    case "hard":
      boardCells = 5;
  }
  buildABoard();
}

function resetGame() {
  masterCodeValues = [];
  feedbackMatrix = [];
  pegBoard = [];
  container.innerHTML = "";
  currentTurn = boardRows;
  buildABoard();
  printPlayerName();
}

function buildABoard() {
  createBoardAndPegBoardObj();
  createMasterCodes();
  createFeedbackDiv();
  assignPegRowEventListeners(currentTurn);
  currentRow = document.querySelectorAll(`.row`)[currentTurn];
  applyActivePegStyle();
  showInstructions(0);
  createPaintCan();
  createGuessButton();
  makePegRowKeyboardActive(currentTurn);
}

function init() {
  currentTurn = boardRows;
  modalForm();
  $("#modal1")
    .modal()
    .modal("open");
  document.getElementById("input_text").focus();
}

init();
