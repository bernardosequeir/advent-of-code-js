const fs = require('fs')
const { get } = require('http')

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
  console.log(two_away);
  return three_away * one_away
}

const getAdaptersCombinations = (input) => {
  const sortedInputs = [0].concat(input.sort((a, b) => a - b))
  sortedInputs.push(sortedInputs[sortedInputs.length - 1] + 3);


  const combinations = (array, cache = {}) => {
    const key = array.join(',');
    if (key in cache) {
      return cache[key];
    }

    let result = 1;
    for (let i = 1; i < array.length - 1; i++) {
      if (array[i + 1] - array[i - 1] <= 3) {
        const arr2 = [array[i - 1]].concat(array.slice(i + 1))
        result += combinations(arr2, cache);
      }
    }
    cache[key] = result;
    return result;
  }

  return combinations(sortedInputs)
}

const inputDataAsInts = inputData.map(number => parseInt(number))

console.log(getAdaptersCombinations(inputDataAsInts))

getJoltageDiferences(inputDataAsInts)