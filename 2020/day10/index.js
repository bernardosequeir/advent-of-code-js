const fs = require('fs')

const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')

const getJoltageDiferences = (input) => {
  let one_away = 0
  let two_away = 0
  let three_away = 1
  const sortedInputs = input.sort((a, b) => a - b)
  for (let i = 0; i < sortedInputs.length - 1; i++) {
    if (sortedInputs[i + 1] - sortedInputs[i] === 1) {
      one_away++
    } else if (sortedInputs[i + 1] - sortedInputs[i] === 2) {
      two_away++
    } else if (sortedInputs[i + 1] - sortedInputs[i] === 3) {
      three_away++
    }
  }
  if (sortedInputs[0] === 1) {
    one_away++
  } else if (sortedInputs[0] === 2) {
    two_away++
  } else if (sortedInputs[0] === 3) {
    three_away++
  }
  return three_away * one_away
}

const inputDataAsInts = inputData.map(number => parseInt(number))

console.log(getJoltageDiferences(inputDataAsInts))