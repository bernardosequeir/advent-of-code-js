const fs = require('fs')
const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')

//adapted from : http://zacg.github.io/blog/2013/08/02/binary-combinations-in-javascript/
const binaryCombos = (n) => {
  var result = [];
  for (y = 0; y < Math.pow(2, n); y++) {
    var combo = [];
    for (x = 0; x < n; x++) {
      //shift bit and and it with 1
      if ((y >> x) & 1)
        combo.push(1);
      else
        combo.push(0);
    }
    result.push(combo);
  }
  return result;
}

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


const parseInstructionsPart1 = (instrcutionList) => {
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
  console.log(memory);
  console.log(sum);
}

///Part 2

const applyBitmaskPart2 = (mask, address) => {
  const newAddress = [...address]
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "X") {
      newAddress[i] = "X"
    } else if (mask[i] === "1") {
      newAddress[i] = "1"
    }
  }
  return newAddress
}


const decodeMemoryAdresses = (mask, decimalAsBits) => {
  const memoryAdresses = []
  const parsedAddress = applyBitmaskPart2(mask, decimalAsBits)
  const combinations = binaryCombos(mask.filter(bit => bit === 'X').length)
  combinations.forEach(combination => {
    let newAddress = parsedAddress.join('')
    combination.forEach(bit => {
      newAddress = newAddress.replace('X', bit)
    })
    memoryAdresses.push(parseInt(newAddress, 2))
  })

  return memoryAdresses
}


const parseInstructionsPart2 = (instrutionList) => {
  let mask = []
  const memory = {}

  instrutionList.forEach(instruction => {
    if (instruction.startsWith('mask')) {
      mask = parseBitmask(instruction)
    } else {
      let { address, decimal } = parseMemoryAssignment(instruction)
      const addressAsBits = numberToBits(address)
      const memoryAdresses = decodeMemoryAdresses(mask, addressAsBits)
      memoryAdresses.forEach(address => memory[address] = decimal)
    }
  })

  let sum = 0
  Object.values(memory).forEach(memoryValue => sum += parseInt(memoryValue))

  console.log(sum);
}


parseInstructionsPart2(inputData)
