const body = document.querySelector("body");
const board = document.querySelector(".js-board");
const paintCan = document.querySelector(".js-paintCan");

const colors = ["blue", "yellow", "green", "orange", "pink", "black"];
let pegBoard = [];
let masterCodeValues = [];
let feedbackMatrix = [];

// this can become user toggleable for difficulty level
const boardRows = 9;
const boardCells = 3;

// this value equals the number of rows until deincremented by nextTurn
let currentTurn = boardRows;

let currentColor;

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
    board.appendChild(row);
    // make an array for this row
    let rowArr = [];

    for (let y = 0; y <= boardCells; y++) {
      // create the html elements
      let newDiv = document.createElement("div");
      newDiv.classList.add("box");
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

function createGuessButton() {
  let guessButton = document.createElement("button");
  guessButton.classList.add("guessButton");
  guessButton.textContent = "Check your guess";
  guessButton.addEventListener("click", runCheckGuessButton);
  body.appendChild(guessButton);
}

function runCheckGuessButton () {
  checkGuess(currentTurn)
}

function createPaintCan() {
  for (let i = 0; i < colors.length; i++) {
    let paintBrush = document.createElement("div");
    paintBrush.classList.add("paintBrush", colors[i]);
    paintBrush.id = colors[i];
    paintCan.appendChild(paintBrush);
    paintCan.addEventListener("click", function(evt) {
      currentColor = evt.target.id;
      evt.target.classList.add("activePaintColor");
    });
  }
}

function highlightPaintCan(color) {
  paintCan.classList.add(color);
}

// make this work
function rinseOffPaintBrushes() {
  paintCan.classList.remove("activePaintColor");
}

function assignPaintColor(event) {
  let id = event.target.id;
  pegBoard[id[0]][id[1]].color = currentColor;
  event.target.classList.add(currentColor);
}

function assignPegRowEventListeners(turn) {
  for (i = 0; i < pegBoard[0].length; i++) {
    let pegDiv = document.getElementById(pegBoard[turn][i].id);
    pegDiv.addEventListener("click", assignPaintColor);
  }
}

function removePegRowEventListeners(turn) {
  let oldTurn = turn + 1;
  console.log("turning off previous listeners from", oldTurn);
  for (i = 0; i < pegBoard[0].length; i++) {
    let pegDiv = document.getElementById(pegBoard[oldTurn][i].id);
    pegDiv.removeEventListener("click", assignPaintColor);
  }
}

function createMasterCodes() {
  // debugger;
  let choices = colors.length;
  let counter = boardCells + 1;
  for (i = 0; i < counter; i++) {
    while (counter > 0) {
      let index = Math.floor(Math.random() * choices);
      counter--;
      // swap the last element with it
      colors[choices] = colors[index];
      let masterCode = new MasterCode(colors[index]);
      masterCodeValues.push(masterCode);
    }
  }
}

function appendMasterCodesDiv () {
  let masterCodeDiv = document.createElement('div')
  masterCodeDiv.classList.add("masterCodeDiv")
  for (i = 0; i < masterCodeValues.length; i++) {
    let eachMasterCode = document.createElement('div')
    eachMasterCode.classList.add('masterCode')
    eachMasterCode.classList.add(masterCodeValues[i].color)
    masterCodeDiv.appendChild(eachMasterCode)
  }
  document.body.appendChild(masterCodeDiv)
}

function setMasterCodesFalse () {
    for (let i = 0; i < masterCodeValues.length; i++) {
    masterCodeValues[i].match = false;
  }
}

function createFeedbackDiv () {
  // get the div
  let feedbackWrapper = document.querySelector('.feedbackWrapper')
  // create the row in the div
  for (i = 0; i <= boardRows; i++) {
    let feedbackRow = document.createElement('div');
    feedbackRow.classList.add("feedbackRow", i);
    // create the four boxes
      for (x = 0; x <= boardCells; x++) {
        let feedbackPeg = document.createElement('div')
        feedbackPeg.classList.add('feedbackPeg')
        feedbackPeg.id = "f" + i + x;
        feedbackRow.appendChild(feedbackPeg);
      }
    feedbackWrapper.appendChild(feedbackRow);
  }
}

// add the shuffle function here?
function makeFeedbackArray (turn) {
  for (let i = 0; i < pegBoard[turn].length; i++) {
    feedbackMatrix.push(pegBoard[turn][i].match);
    }
    console.log("feedback:", feedbackMatrix);
}

function checkScore () {
  let score = feedbackMatrix.reduce((a, b) => a + b);
  if (score === 8) {
    console.log("you win");
  } else {
    printFeedback()
    feedbackMatrix = []
    nextTurn();
  }
}

function printFeedback () {
  // get dom elements for current turn ('f' + x + i)
  // 'f' prepends the element id, x = current turn, i = element index
  for (i = 0; i <= boardCells; i++) {
    let feedbackPeg = document.getElementById(`f${currentTurn}${i}`)
    console.log(feedbackPeg)
    console.log(`print ${feedbackMatrix[i]}`)
    switch (feedbackMatrix[i]) {
      case 0:
        feedbackPeg.classList.add('noMatch')
        break
        case 1:
        feedbackPeg.classList.add('halfMatch')
        break
        case 2:
        feedbackPeg.classList.add('fullMatch')
    }
    console.log(feedbackPeg)
  }
}

function checkGuess(turn) {

  // for each item check for full matches
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].color === masterCodeValues[i].color) {
      // console.log("full match")
      pegBoard[turn][i].match = 2;
      masterCodeValues[i].match = true;
    }
  }
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].match === 0) {
      for (let x = 0; x < masterCodeValues.length; x++) {
        if (pegBoard[turn][i].color === masterCodeValues[x].color
          && masterCodeValues[x].match === false) {
          pegBoard[turn][i].match = 1;
          masterCodeValues[x].match = true;
        }
      }
    }
  }
  makeFeedbackArray(currentTurn)
  checkScore()
}
  // get all the match values into an array

// in class form creation
let form = document.querySelector('.form')
let nameImput = document.querySelector('.name')
form.addEventListener('submit', function(evt) {
  evt.preventDefault()
  console.log(nameImput.value)
})


function nextTurn() {
  currentTurn--;
  setMasterCodesFalse()
  // reassign the event listeners
  removePegRowEventListeners(currentTurn);
  assignPegRowEventListeners(currentTurn);
}

function init() {
  createBoardAndPegBoardObj();
  createPaintCan();
  createFeedbackDiv();
  currentTurn = boardRows;
  assignPegRowEventListeners(currentTurn);
  createMasterCodes();
  appendMasterCodesDiv();
  createGuessButton();
  // console.log("the master code is", masterCodeValues);
}

init();
