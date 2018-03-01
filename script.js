const body = document.querySelector('body')
const board = document.querySelector('.js-board')
const pegBucket = document.querySelector('.js-pegBucket')

const colors = ['blue', 'yellow', 'green', 'orange', 'pink', 'black']
let pegBoard = []
let masterCodeValues = []

const boardRows = 9
const boardCells = 3

class Pegs {
  constructor (id,x,y,color = null, match = 0) {
    this.color = color
    this.id = id
    this.x = x
    this.y = y
    // match 0 = no match, 1 = color match, 2 = color and location match
    this.match = match
  }
}

class MasterCode {
  constructor(color){
    this.color = color
    this.match = false
  }
}


// create the board
function createBoard () {
for (var x = 0; x <= boardRows; x++) {
  // create the html row
  let row = document.createElement('div')
  row.classList.add('row', 'js-row' + x)
  board.appendChild(row)
  // make an array for this row
  let rowArr = []

  for (let y = 0; y <= boardCells; y++) {
    // create the html elements
    let newDiv = document.createElement('div')
    newDiv.classList.add('box')
    newDiv.id = '' + x + y
    row.appendChild(newDiv)
    // push the new object to the above array
    let newPeg = new Pegs (('' + x + y), x, y)
    rowArr.push(newPeg)
  }
  pegBoard.push(rowArr)
}}

createBoard()

let selectedPegColor
let targetPegObj = 00
let selectedPegObj
const Row9 = document.querySelector('.js-row9')
const Row8 = document.querySelector('.js-row8')
const Row7 = document.querySelector('.js-row7')
const Row6 = document.querySelector('.js-row6')
const Row5 = document.querySelector('.js-row5')
let currentRow = Row9

// create the peg bucket
for (let i = 0; i < colors.length; i++) {
  let BucketPeg = document.createElement('div')
  BucketPeg.classList.add('bucketPeg', colors[i])
  BucketPeg.id = colors[i]
  pegBucket.appendChild(BucketPeg)
}

// make the bucketPegs alive
// when the user clicks a bucketPeg, transfer that value to the div and object
pegBucket.addEventListener('click', function(evt) {
  selectedPegColor = evt.target.id
  evt.target.classList.add('selectedPeg')
  // console.log(selectedPegColor)
})

// make the current row alive
currentRow.addEventListener('click', function(evt) {
  // change the div style
  evt.target.classList.add(selectedPegColor);
  // give the object value
  // let currentId =
  targetPegObj = evt.target.id
  assignPegToObject()
})

// make function that takes the current div returns the object
const assignPegToObject = function () {
  let x = targetPegObj[0]
  let y = targetPegObj[1]
  let selectedPegObj = pegBoard[x][y]
  selectedPegObj.color = selectedPegColor
}

// shuffle the colors array into master code array
// https://stackoverflow.com/a/6274398

const MasterCodeCreator = function () {
  // debugger;
  let choices = colors.length
  let counter = boardCells + 1
  for (i = 0; i < counter; i++) {
        while (counter > 0) {
        let index = Math.floor(Math.random() * choices)
        counter--
        // swap the last element with it
        colors[choices] = colors[index]
        let masterCode = new MasterCode (colors[index])
        masterCodeValues.push(masterCode)
    }
  }
}

MasterCodeCreator()

let currentPegRow = pegBoard[9]

console.log("the master code is",masterCodeValues)

const checkGuess = function () {

  let feedbackMatrix = []

  for (let i = 0; i < masterCodeValues.length; i++) {
    // compare every guess index only to matching master index
    if (currentPegRow[i].color === masterCodeValues[i].color) {
      console.log(currentPegRow[i].color,"matches",masterCodeValues[i].color)
      currentPegRow[i].match = 2
      masterCodeValues[i].match = true
    } else {
      // compare every guess index to every master index
      for (let x = 0; x < masterCodeValues.length; x++) {
        //
        if (masterCodeValues[x].match === false
          && currentPegRow[i].color === masterCodeValues[x].color) {
          console.log(currentPegRow[i].color,i,"matches a color at",x)
          currentPegRow[i].match = 1
          masterCodeValues[x].match = true
        }
      }
    }
  }

  // get all the match values into an array
  for (let i = 0; i < currentPegRow.length; i++) {
    feedbackMatrix.push(currentPegRow[i].match)
  }

  console.log("feedback:",feedbackMatrix)

  let score = feedbackMatrix.reduce((a,b) => a + b)

  if (score === 8) {
    console.log("you win")
    } else {
    console.log(score)
    }

    // now increment the turn value

}

// 1. user selects peg color, color is held in variable selectedPegColor
// 2. user places color into peg hole, color is transferred to
//    the div as a class and the object as a value
// 3. user presses make guess button
// 4. function evaulates row array against master

    // match 0 = no match, 1 = color match, 2 = color and location match

// function that creates the master code

// function that evaluates the user guess against the master


