const body = document.querySelector('body')
const board = document.querySelector('.js-board')
const pegBucket = document.querySelector('.js-pegBucket')

const colors = ['blue', 'yellow', 'green', 'orange']

// create the board
for (let x = 1; x < 11; x++) {
  let row = document.createElement('div')
  row.classList.add('row' + x)
  row.classList.add('row')
  board.appendChild(row)

  // make five divs
  for (let i = 1; i < 6; i++) {
    let newDiv = document.createElement('div')
    newDiv.classList.add('box')
    newDiv.classList.add('box' + x + i)
    row.appendChild(newDiv)
  }
}

// create the peg bucket
for (let i = 0; i < colors.length; i++) {
  let BucketPeg = document.createElement('div')
  BucketPeg.classList.add('bucketPeg')
  pegBucket.appendChild(BucketPeg)
}


// peg options
// 'magenta', 'blue', 'yellow', 'green', 'orange', 'white'

// Game board
// 10 rows of divs
// 5 divs in each row
