const { count } = require('console');
const fs = require('fs')

const inputData = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(line => line.split(''))


const countOccupiedSeats = (seats) => {
  let occupiedSeats = 0
  seats.forEach(row => {
    row.forEach(seat => {
      if (seat === "#") occupiedSeats++
    })
  })
  return occupiedSeats
}

const calculateSeating = (seats, i, j) => {
  let adjacentOccupiedSeats = 0
  if (j - 1 > -1) {
    if (seats[i][j - 1] === "#") {
      adjacentOccupiedSeats++
    }
    if (i - 1 > -1 && seats[i - 1][j - 1] === "#") {
      adjacentOccupiedSeats++
    }
    if (i + 1 < seats.length && seats[i + 1][j - 1] === "#") {
      adjacentOccupiedSeats++
    }
  }
  if (j + 1 < seats[0].length) {
    if (seats[i][j + 1] === "#") {
      adjacentOccupiedSeats++
    }
    if (i - 1 > -1 && seats[i - 1][j + 1] === "#") {
      adjacentOccupiedSeats++
    }
    if (i + 1 < seats.length && seats[i + 1][j + 1] === "#") {
      adjacentOccupiedSeats++
    }
  }
  if (i - 1 > -1 && seats[i - 1][j] === "#") {
    adjacentOccupiedSeats++
  }
  if (i + 1 < seats.length && seats[i + 1][j] === "#") {
    adjacentOccupiedSeats++
  }

  return adjacentOccupiedSeats
}

const simulateSeating = (seats) => {
  let lastStep = []
  let currentStep = [...seats]
  let steps = 0
  while (JSON.stringify(lastStep) !== JSON.stringify(currentStep)) {
    lastStep = currentStep.map(arr => [...arr])
    for (let i = 0; i < lastStep.length; i++) {
      for (let j = 0; j < lastStep[0].length; j++) {
        let adjacentOccupiedSeats = calculateSeating(lastStep, i, j)
        if (adjacentOccupiedSeats >= 4 && lastStep[i][j] === "#") {
          currentStep[i][j] = "L"
        } else if (adjacentOccupiedSeats === 0 && lastStep[i][j] === "L") {
          currentStep[i][j] = "#"
        }
      }
    }
  }

  return countOccupiedSeats(currentStep)

}
console.log(simulateSeating(inputData));