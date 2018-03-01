const body = document.querySelector('body')
const board = document.querySelector('.js-board')
const pegBucket = document.querySelector('.js-pegBucket')

const colors = ['blue', 'yellow', 'green', 'orange', 'pink', 'black']
let pegBoard = []
let masterCodeValues = []

const boardRows = 9
const boardCells = 3

class Pegs {
  constructor (id,x,y,color = null) {
    this.color = color;
    this.id = id
    this.x = x
    this.y = y
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
  console.log(selectedPegColor)
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
  console.log(selectedPegObj)
}

// shuffle the colors array into master code array
// https://stackoverflow.com/a/6274398
const MasterCode = function () {
    let choices = colors.length
    let counter = boardCells + 1;
// debugger;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * choices);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = colors[choices];
        colors[choices] = colors[index];
        masterCodeValues.push(colors[index])
    }
}
MasterCode()



console.log(masterCodeValues)
const checkGuess = function () {

}

// 1. user selects peg color, color is held in variable selectedPegColor
// 2. user places color into peg hole, color is transferred to
//    the div as a class and the object as a value
// 3. user presses make guess button
// 4. function evaulates row array against master


// function that creates the master code

// function that evaluates the user guess against the master


