const body = document.querySelector('body')
const board = document.querySelector('.js-board')
const pegBucket = document.querySelector('.js-pegBucket')

const colors = ['blue', 'yellow', 'green', 'orange']

// create the board
for (let x = 0; x < 11; x++) {
  let row = document.createElement('div')
  row.classList.add('row', 'row' + x)
  board.appendChild(row)

  // make five divs
  for (let i = 0; i < 6; i++) {
    let newDiv = document.createElement('div')
    newDiv.classList.add('box', 'box' + x + i)
    row.appendChild(newDiv)
  }
}

// create the peg bucket
for (let i = 0; i < colors.length; i++) {
  let BucketPeg = document.createElement('div')
  BucketPeg.classList.add('bucketPeg', colors[i])
  pegBucket.appendChild(BucketPeg)
}

// select the boxes


// make the bucketPegs alive
pegBucket.addEventListener('click', function(evt) {
  evt.target.classList.add('selectedPeg')
})

// when the user clicks a bucketPeg, transfer that value to the first div


// const attemptOne = document.querySelector('.')

