const fs = require('fs')

inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')


const parseInputData = (data) => {
  const instructions = data.map(instruction => {
    let parts = instruction.split(" ");
    return { instruction: parts[0], value: parts[1], executed: false }
  })
  return instructions
}


const parseInstructionsUntilRepeat = (instructionList) => {
  let repeated = false
  let acc = 0
  let pointer = 0
  while (!repeated) {
    console.log(instructionList[pointer]);
    if (instructionList[pointer].executed === true) return acc
    instructionList[pointer].executed = true

    if (instructionList[pointer].instruction === 'acc') {
      acc += parseInt(instructionList[pointer].value)
      pointer += 1
    } else if (instructionList[pointer].instruction === 'jmp') {
      pointer += parseInt(instructionList[pointer].value)
    } else {
      pointer += 1
    }
  }
}

console.log(parseInstructionsUntilRepeat(parseInputData(inputData)));
