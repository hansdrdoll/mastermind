const body = document.querySelector('body')
const board = document.querySelector('.js-board')
const pegBucket = document.querySelector('.js-pegBucket')

const colors = ['blue', 'yellow', 'green', 'orange', 'pink', 'black']
let pegBoard = []

const boardRows = 9
const boardCells = 4

class Pegs {
  constructor (id,x,y, currentColor = null) {
    this.currentColor = currentColor;
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

let selectedPeg
let targetPegObj
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
  selectedPeg = evt.target.id
  evt.target.classList.add('selectedPeg')
})

currentRow.addEventListener('click', function(evt) {
  evt.target.classList.add(selectedPeg);
  //
  let currentId = evt.target.id
  targetPegObj = currentId
})

// make function that takes the current div and assigns that




