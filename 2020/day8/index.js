const fs = require('fs');

inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')


const parseInputData = (data) => {
  const instructions = data.map(instruction => {
    let parts = instruction.split(" ");
    return { instruction: parts[0], value: parts[1], executed: false }
  })
  return instructions
}


const parseInstructions = (instructionList) => {
  let repeated = false
  let acc = 0
  let pointer = 0
  while (!repeated) {
    console.log(instructionList[pointer]);
    if (instructionList[pointer].executed === true) return { acc, finished: false }

    instructionList[pointer].executed = true

    if (instructionList[pointer].instruction === 'acc') {
      acc += parseInt(instructionList[pointer].value)
      pointer += 1
    } else if (instructionList[pointer].instruction === 'jmp') {
      pointer += parseInt(instructionList[pointer].value)
    } else {
      pointer += 1
    }
    if (pointer === instructionList.length) return { acc, finished: true }
  }
}

const findInstructionToChange = (instructionList) => {
  for (let pointer = 0; pointer < instructionList.length; pointer++) {
    console.log(instructionList);
    const newInstructions = JSON.parse(JSON.stringify(instructionList))
    if (instructionList[pointer].instruction === "nop") {

      newInstructions[pointer].instruction = "jmp"
      console.log(newInstructions);
    } else if (instructionList[pointer].instruction === "jmp") {
      newInstructions[pointer].instruction = "nop"
    }
    if (newInstructions) {
      let { acc, finished } = parseInstructions(newInstructions)
      if (finished === true) {
        return acc
      }
    }
  }
  return null
}

console.log(findInstructionToChange(parseInputData(inputData)));
