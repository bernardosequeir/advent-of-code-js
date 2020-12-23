const input = [1, 20, 11, 6, 12, 0]

const memoryGame = (startingNumbers, turnLimit) => {
  let turn = startingNumbers.length - 1
  let numberList = [...startingNumbers]
  let currentNumber = startingNumbers[turn - 1]
  while (turn + 1 < turnLimit) {
    if (turn === startingNumbers.length && numberList.filter(num => num === currentNumber).length === 1) {
      currentNumber = 0
      numberList.push(currentNumber)
    }
    else if (numberList.filter(num => num === currentNumber).length > 1) {
      let turnsNumberAppeared = numberList.flatMap((number, index) => number === currentNumber ? index : [])

      currentNumber = turn - turnsNumberAppeared[turnsNumberAppeared.length - 2]
      numberList.push(currentNumber)
    }
    else {
      currentNumber = 0
      numberList.push(currentNumber)
    }
    turn++
  }
  return numberList[turnLimit - 1]
}
console.log(memoryGame([1, 20, 11, 6, 12, 0], 2020))
