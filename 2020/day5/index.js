const fs = require('fs');

let inputData = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const verifyId = (id) => {
  let lowerBound = 0
  let upperBound = 128
  let columnLowerBound = 0
  let columnUpperBound = 8
  const sequence = id.split('')
  sequence.forEach(value => {
    switch (value) {
      case 'B':
        lowerBound += (upperBound - lowerBound) / 2
        break
      case 'F':
        upperBound -= (upperBound - lowerBound) / 2
        break
      case 'R':
        columnLowerBound += (columnUpperBound - columnLowerBound) / 2
        break
      case 'L':
        columnUpperBound -= (columnUpperBound - columnLowerBound) / 2
        break
      default:
        break
    }
  })
  return (upperBound - 1) * 8 + (columnUpperBound - 1)
}

const getHighestId = (boardingPassList) => {
  let highestId = 0
  boardingPassList.forEach(pass => { const id = verifyId(pass); id > highestId ? highestId = id : null })
  return highestId
}

const getMyTicketId = (boardingPassList) => {
  const ticketList = boardingPassList.map(pass => verifyId(pass))
  ticketList.sort() // so we can find n so that n+1 and n-1 exists
  for (let i = 0; i < ticketList.length; i++) {
    if (ticketList[i + 1] - ticketList[i] == 2) {
      return ticketList[i] + 1
    }
  }
}

console.log(getMyTicketId(inputData))
