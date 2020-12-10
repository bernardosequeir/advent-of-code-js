const fs = require('fs')

const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')

const checkSum = (preamble, number) => {
  for (let i = 0; i < preamble.length; i++){
    for (let j = i +1 ; j < preamble.length; j++){
      if(preamble[i] + preamble[j] == number) return true
    }
  }
  return false 
}

const findInvalidXmasData = (inputData) => {

  const preamble = inputData.slice(0,25)
  for(let i = 25; i < inputData.length; i++){
    if(!checkSum(preamble , inputData[i]))return inputData[i]
    preamble.shift()
    preamble.push(inputData[i])
  }

}

const findXmasEncryptionWeakness = (inputData, invalid) => {
  for(let i = 0; inputData[i] < invalid; i++){
    let sum = inputData[i] 
    let contiguousRange = [inputData[i]]
    let pointer = i+1
    while(sum < invalid){
      sum+=inputData[pointer]
      contiguousRange.push(inputData[pointer])
      if(sum === invalid)return Math.max(...contiguousRange) + Math.min(...contiguousRange)
      pointer++
    }
  }
  return false
}

const inputDataAsInts = inputData.map(input => parseInt(input))

const invalidValue = findInvalidXmasData(inputDataAsInts)
console.log(invalidValue)

console.log(findXmasEncryptionWeakness(inputDataAsInts, invalidValue))
