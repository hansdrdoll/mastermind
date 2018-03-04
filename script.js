const body = document.querySelector("body");
const container = document.querySelector(".gameContainer");
// const board = document.querySelector(".js-board");
const paintCan = document.querySelector(".js-paintCan");

// const colors = [
//   "bluePeg",
//   "purplePeg",
//   "greenPeg",
//   "orangePeg",
//   "greyPeg",
//   "redPeg"
// ];

const newColors = [
  { color: "bluePeg", letter: "B" },
  { color: "purplePeg", letter: "M" },
  { color: "greenPeg", letter: "G" },
  { color: "orangePeg", letter: "O" },
  { color: "greyPeg", letter: "W" },
  { color: "redPeg", letter: "R" }
];

let pegBoard = [];
let masterCodeValues = [];
let feedbackMatrix = [];

// this can become user toggleable for difficulty level
const boardRows = 9;
const boardCells = 3;

// this value equals the number of rows until deincremented by nextTurn
let currentTurn = boardRows;
let currentColor;
let currentRow;
let playerInitials = "Player";

// for the modal
// let modal1 = $(document).ready(function(){
//     $('.modal').modal();
//   });

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

// create the board
function createBoardAndPegBoardObj() {
  for (let x = 0; x <= boardRows; x++) {
    // create the html row
    let row = document.createElement("div");
    row.classList.add("row", "js-row" + x);
    container.appendChild(row);
    // make an array for this row
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
    // push the row array to the pegBoard
    pegBoard.push(rowArr);
  }
}

function printPlayerName() {
  let playerName = document.createElement("div");
  playerName.classList.add("playerInitals");
  playerName.textContent = `Welcome, ${playerInitials}`;
  container.appendChild(playerName);
}

function createGuessButton() {
  let guessButton = document.createElement("button");
  guessButton.classList.add(
    `guessButton`,
    `waves-effect`,
    `waves-light`,
    `btn`,
    `blue-grey`,
    `darken-4`
  );
  guessButton.textContent = "Guess";
  guessButton.addEventListener("click", runCheckGuessButton);
  paintCan.appendChild(guessButton);
}

function showInstructions(stage) {
  switch (stage) {
    case 0:
      let instructions = document.createElement("div");
      instructions.classList.add("instructions");
      instructions.textContent = `Welcome to the game! The mastermind has selected a secret code. Your have ${boardRows +
        1} attemtps to guess it!`;
      container.appendChild(instructions);
      break;
    case 1:
      document.querySelector(
        ".instructions"
      ).textContent = `Check your feedback and make another guess!`;
      break;
    case 2:
      document.querySelector(
        ".instructions"
      ).textContent = `Check your feedback and make another guess!`;
      break;
    case 3:
      document.querySelector(
        ".instructions"
      ).textContent = `Better luck next time!`;
      break;
    case 4:
      document.querySelector(
        ".instructions"
      ).textContent = `Congrats, you beat the mastermind!`;
      break;
  }
}

function runCheckGuessButton() {
  // this should evaluate if user hasn't filled in options,
  // like an accidential double click
  checkGuess(currentTurn);
}

function createPaintCan() {
  for (let i = 0; i < newColors.length; i++) {
    let paintBrush = document.createElement("div");
    paintBrush.classList.add("paintBrush", newColors[i].color);
    paintBrush.id = newColors[i].color;
    paintBrush.innerHTML = `${newColors[i].letter}`
    paintBrush.addEventListener("click", highlightPaintCan);
    paintCan.appendChild(paintBrush);
  }
}

// make this work
// function rinseOffPaintBrushes() {
//   paintCan.classList.remove("activePaintColor");
// }

function assignPaintColor(evt) {
  // remove all paintbrush active classes
  let id = evt.target.id;
  evt.target.classList.remove(
    "greyPeg",
    "purplePeg",
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
  }
}

function highlightPaintCan(evt) {
  currentColor = evt.target.id;
  let allBrushes = document.querySelectorAll(".paintBrush");
  // omg so this is the only easy way to loop over a node list
  for (let brush of allBrushes) {
    brush.classList.remove("activePaintColor");
  }
  evt.target.classList.add("activePaintColor");
}

function createMasterCodes() {
  // debugger;
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
  }
}

function appendMasterCodesDiv() {
  let masterCodeDiv = document.createElement("div");
  masterCodeDiv.classList.add("masterCodeDiv","card-panel","blue-grey","darken-2");
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
  // get the div
  let feedbackWrapper = document.querySelector(".feedbackWrapper");
  // create the row in the div
  for (i = 0; i <= boardRows; i++) {
    let feedbackRow = document.createElement("div");
    feedbackRow.classList.add("feedbackRow", i);
    // create the four boxes
    for (x = 0; x <= boardCells; x++) {
      let feedbackPeg = document.createElement("div");
      feedbackPeg.classList.add("feedbackPeg");
      feedbackPeg.id = "f" + i + x;
      feedbackRow.appendChild(feedbackPeg);
    }
    container.appendChild(feedbackRow);
  }
}

// sort this array after generating it
function makeFeedbackArray(turn) {
  for (let i = 0; i < pegBoard[turn].length; i++) {
    feedbackMatrix.push(pegBoard[turn][i].match);
    console.log(feedbackMatrix);
    feedbackMatrix.sort();
    // console.log(feedbackMatrix)
  }
  // console.log("feedback:", feedbackMatrix);
}

function checkScore() {
  let score = feedbackMatrix.reduce((a, b) => a + b);
  if (score === 8) {
    console.log("you win");
    appendMasterCodesDiv();
  } else if (currentTurn < 1) {
    console.log("you lost")
  } else {
    printFeedback();
    showInstructions(1);
    feedbackMatrix = [];
    nextTurn();
  }
}

function printFeedback() {
  // get dom elements for current turn ('f' + x + i)
  // 'f' prepends the element id, x = current turn, i = element index
  for (i = 0; i <= boardCells; i++) {
    let feedbackPeg = document.getElementById(`f${currentTurn}${i}`);
    // console.log(feedbackPeg);
    // console.log(`print ${feedbackMatrix[i]}`);
    switch (feedbackMatrix[i]) {
      case 0:
        // feedbackPeg.classList.add("noMatch");
        break;
      case 1:
        feedbackPeg.classList.remove("feedbackPeg");
        feedbackPeg.classList.add("feedbackPegHalf");
        break;
      case 2:
        feedbackPeg.classList.remove("feedbackPeg");
        feedbackPeg.classList.add("feedbackPegFull");
    }
  }
}

function checkGuess(turn) {
  // for each item check for full matches
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].color === masterCodeValues[i].color) {
      console.log(pegBoard[turn][i].color,masterCodeValues[i].color,"full match")
      pegBoard[turn][i].match = 2;
      masterCodeValues[i].match = true;
    }
  }
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].match === 0) {
      for (let x = 0; x < masterCodeValues.length; x++) {
        if (
          pegBoard[turn][i].color === masterCodeValues[x].color &&
          masterCodeValues[x].match === false && pegBoard[turn][i].match === 0
        ) {
          console.log("master code",masterCodeValues)
          console.log("peg board",pegBoard[turn])
          console.log(pegBoard[turn][i].color,masterCodeValues[x].color,"half match")
          pegBoard[turn][i].match = 1;
          masterCodeValues[x].match = true;
        }
      }
    }
  }
  makeFeedbackArray(currentTurn);
  checkScore();
}

function nextTurn() {
  // currentRow.classList.remove('activePeg')
  currentTurn--;
  currentRow = document.querySelectorAll(`.row`)[currentTurn];
  setMasterCodesFalse();
  applyActivePegStyle();
  // reassign the event listeners
  removePegRowEventListeners(currentTurn);
  assignPegRowEventListeners(currentTurn);
  // currentRow.children.classList.add('activePeg')
}

function modalForm() {
  let form = document.querySelector(".input-field");
  let nameInput = document.querySelector(".playerInitials");
  form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    playerInitials = nameInput.value.toUpperCase();
    printPlayerName();
  });
}

function applyActivePegStyle() {
  for (i = 0; i <= boardCells; i++) {
    let activePeg = currentRow.children[i];
    activePeg.classList.add("activePeg");
  }
}

function youLost () {
  showInstructions(3)
}

function youWin () {
  showInstructions(4)
}

function init() {
  currentTurn = boardRows;
  createBoardAndPegBoardObj();
  currentRow = document.querySelectorAll(`.row`)[currentTurn];
  applyActivePegStyle();
  createPaintCan();
  createFeedbackDiv();
  assignPegRowEventListeners(currentTurn);
  createMasterCodes();
  createGuessButton();
  showInstructions(0);

  //  $('#modal1').modal().modal('open');
  //  modalForm()
   console.log("the master code is", masterCodeValues);
  printPlayerName();
}

init();
