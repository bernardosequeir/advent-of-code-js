const { count } = require('console');
const fs = require('fs');
const { setMaxListeners } = require('process');

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

const calculateSeatingPart1 = (seats, i, j) => {
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


const simulateSeatingPart1 = (seats) => {
  let lastStep = []
  let currentStep = seats.map(arr => [...arr])
  let steps = 0
  while (JSON.stringify(lastStep) !== JSON.stringify(currentStep)) {
    lastStep = currentStep.map(arr => [...arr])
    for (let i = 0; i < lastStep.length; i++) {
      for (let j = 0; j < lastStep[0].length; j++) {
        let adjacentOccupiedSeats = calculateSeatingPart1(lastStep, i, j)
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

const calculateSeatingPart2 = (seats, i, j) => {
  let adjacentOccupiedSeats = 0
  let x = i
  let y = j
  let notFound = true
  while (notFound && y - 1 > -1) {
    y--
    if (seats[i][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false

  }

  x = i
  y = j
  notFound = true
  while (notFound && y - 1 > -1 && x - 1 > -1) {
    x--
    y--
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }

  x = i
  y = j
  notFound = true
  while (notFound && y - 1 > -1 && x + 1 < seats.length) {
    x++
    y--
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }




  x = i
  y = j
  notFound = true
  while (notFound && y + 1 < seats[0].length) {
    y++
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }

  x = i
  y = j
  notFound = true
  while (notFound && y + 1 < seats[0].length && x - 1 > -1) {
    x--
    y++
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }

  x = i
  y = j
  notFound = true
  while (notFound && y + 1 < seats[0].length && x + 1 < seats.length) {
    x++
    y++
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }


  x = i
  y = j
  notFound = true
  while (notFound && x - 1 > -1) {
    x--
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }

  x = i
  y = j
  notFound = true
  while (notFound && x + 1 < seats.length) {
    x++
    if (seats[x][y] === "#") {
      adjacentOccupiedSeats++
      notFound = false
    } else if (seats[x][y] === "L") notFound = false
  }

  return adjacentOccupiedSeats
}

const simulateSeatingPart2 = (seats) => {
  let lastStep = []
  let currentStep = seats.map(arr => [...arr])
  let steps = 0
  while (JSON.stringify(lastStep) !== JSON.stringify(currentStep)) {
    lastStep = currentStep.map(arr => [...arr])
    for (let i = 0; i < lastStep.length; i++) {
      for (let j = 0; j < lastStep[0].length; j++) {
        let adjacentOccupiedSeats = calculateSeatingPart2(lastStep, i, j)
        if (adjacentOccupiedSeats >= 5 && lastStep[i][j] === "#") {
          currentStep[i][j] = "L"
        } else if (adjacentOccupiedSeats === 0 && lastStep[i][j] === "L") {
          currentStep[i][j] = "#"
        }
      }
    }
  }

  return countOccupiedSeats(currentStep)

}
console.log(simulateSeatingPart2(inputData));