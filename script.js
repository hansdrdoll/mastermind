const body = document.querySelector("body");
const board = document.querySelector(".js-board");
const paintCan = document.querySelector(".js-paintCan");

const colors = ["blue", "yellow", "green", "orange", "pink", "black"];
let pegBoard = [];
let masterCodeValues = [];

// this can become user toggleable for difficulty level
const boardRows = 9;
const boardCells = 3;

// this value equals the number of rows until deincremented by nextTurn
let currentTurn = boardRows;

let currentColor;

class Pegs {
  constructor(id, x, y, color, match = 0) {
    this.color = color;
    this.id = id;
    // i don't think I need x and y values anymore since i'm just using id
    // this.x = x;
    // this.y = y;
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

function createGuessButton(turn) {
  let guessButton = document.createElement("button");

  guessButton.classList.add("guessButton");
  guessButton.value = "Guess";
  guessButton.textContent = "Check your guess";
  guessButton.addEventListener("click", function() {
    checkGuess(turn);
  });
  body.appendChild(guessButton);
}

// formerly knows as the peg bucket
function createPaintCan() {
  for (let i = 0; i < colors.length; i++) {
    // print paintCan to the DOM
    let paintBrush = document.createElement("div");
    paintBrush.classList.add("paintBrush", colors[i]);
    paintBrush.id = colors[i];
    paintCan.appendChild(paintBrush);
    // and make them active

    paintCan.addEventListener("click", function(evt) {
      console.log(evt.target.id);
      currentColor = evt.target.id;
      // assign the color clicked to the active paint color var
      // getPaintColor(evt.target.id)
      // highlight which paint is selected
      evt.target.classList.add("activePaintColor");
    });
  }
}

function highlightPaintCan(color) {
  paintCan.classList.add(color);
}

function rinseOffPaintBrushes() {
  paintCan.classList.remove("activePaintColor");
}

function assignPaintColor(event) {
  console.log(currentColor);
  let id = event.target.id;
  pegBoard[id[0]][id[1]].color = currentColor;
  event.target.classList.add(currentColor);
}

function assignPegRowEventListeners(turn) {
  // for loop that assings event listeners that call
  // tried to take this function outside to fix the matching error on removeeventlistener
  // add event listeners to pegs
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

// make function that takes the current div returns the object
// const assignPegToObject = function () {
//   let x = targetPegObj[0]
//   let y = targetPegObj[1]
//   let selectedPegObj = pegBoard[x][y]
//   selectedPegObj.color = currentColor
// }

// shuffle the colors array into master code array
// https://stackoverflow.com/a/6274398

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

// let currentPegRow = pegBoard[9]

console.log("the master code is", masterCodeValues);

function checkGuess(turn) {
  let feedbackMatrix = [];

  for (let i = 0; i < masterCodeValues.length; i++) {
    // compare every guess index only to matching master index
    // console.log(pegBoard[turn][i]);
    if (pegBoard[turn][i].color === masterCodeValues[i].color) {
      console.log(
        `${pegBoard[turn][i].color} matches ${
          masterCodeValues[i].color
        } in location ${i}`
      );
      pegBoard[turn][i].match = 2;
      masterCodeValues[i].match = true;
    } else {
      // compare every guess index to every master index
      for (let x = 0; x < masterCodeValues.length; x++) {
        //
        if (
          masterCodeValues[x].match === false &&
          pegBoard[turn][i].color === masterCodeValues[x].color
        ) {
          console.log(pegBoard[turn][i].color, i, "matches a color at", x);
          pegBoard[turn][i].match = 1;
          masterCodeValues[x].match = true;
        }
      }
    }
  }

  // get all the match values into an array
  function makeFeedbackArray () {
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
      console.log(score);
      nextTurn();
    }
  }

  makeFeedbackArray()
  checkScore()
}

function nextTurn() {
  // assigns event listeners to currentTurn pegBoard array index
  currentTurn--;
  // turn off event listeners
  // set all master tags to false
  for (let i = 0; i < masterCodeValues.length; i++) {
    masterCodeValues[i].match = false;
  }
  // delete the old guess button until i figure out how to fix it
  let guessButton = document.querySelector(".guessButton");
  guessButton.parentNode.removeChild(guessButton);
  // make a new guess button
  createGuessButton(currentTurn);
  // reassign the event listeners
  removePegRowEventListeners(currentTurn);
  assignPegRowEventListeners(currentTurn);
}

function init() {
  createBoardAndPegBoardObj();
  createPaintCan();
  currentTurn = 9;
  assignPegRowEventListeners(currentTurn);
  createMasterCodes();
  appendMasterCodesDiv();
  createGuessButton(currentTurn);
}

init();
// 1. user selects peg color, color is held in variable currentColor
// 2. user places color into peg hole, color is transferred to
//    the div as a class and the object as a value
// 3. user presses make guess button
// 4. function evaulates row array against master

// match 0 = no match, 1 = color match, 2 = color and location match

// To Do
// 1) display master code for testing
