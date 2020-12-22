const fs = require('fs')
const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')


const numberToBits = (decimal) => {
  let bits = Array.from(Array(36)).map(bit => 0)
  let number = decimal
  for (let i = 35; i >= 0; i--) {
    if (number >= 2 ** i) {
      number -= 2 ** i
      bits[i] = 1
    }
  }

  return bits.reverse()
}

const bitsToNumber = (bits) => {
  let number = 0
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === 1) number += 2 ** (35 - i)
  }
  return number
}

const applyBitmask = (bitmask, bits) => {
  const newNumber = [...bits]
  for (let i = 0; i < bitmask.length; i++) {
    if (bitmask[i] !== "X") {
      newNumber[i] = parseInt(bitmask[i])
    }
  }
  return newNumber
}

const parseBitmask = (line) => {
  return line.split(' ')[2].split('');
}

const parseMemoryAssignment = (line) => {
  let values = line.split(' ')
  let decimal = values[2]
  let address = values[0].split('[')[1].split([']'])[0]
  return { address, decimal }
}


const parseInstructions = (instrcutionList) => {
  let mask = []
  const memory = {}

  instrcutionList.forEach(instruction => {
    if (instruction.startsWith('mask')) {
      mask = parseBitmask(instruction)
    } else {
      let { address, decimal } = parseMemoryAssignment(instruction)
      const decimalAsBits = numberToBits(decimal)
      const bitsAfterBitmask = applyBitmask(mask, decimalAsBits)
      memory[address] = bitsAfterBitmask
    }
  })

  let sum = 0
  Object.values(memory).forEach(memoryValue => sum += bitsToNumber(memoryValue))
  console.log(sum);
}


parseInstructions(inputData)
