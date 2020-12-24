const input = [1, 20, 11, 6, 12, 0]

const memoryGame = (startingNumbers, turnLimit) => {
  let lastSaid = Array(turnLimit)
  for (let i = 0; i < startingNumbers.length - 1; i++) {
    lastSaid[startingNumbers[i]] = i + 1
  }
  let currentNumber = startingNumbers[startingNumbers.length - 1]
  for (let turn = startingNumbers.length; turn < turnLimit; turn++) {
    if (!lastSaid[currentNumber]) {
      lastSaid[currentNumber] = turn
      currentNumber = 0
    }
    else {
      let timeBefore = lastSaid[currentNumber]
      lastSaid[currentNumber] = turn
      currentNumber = turn - timeBefore

    }
  }



  return currentNumber
}
console.log(memoryGame([1, 20, 11, 6, 12, 0], 30000000))
