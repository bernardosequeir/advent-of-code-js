const fs = require('fs')
const { Z_BEST_COMPRESSION } = require('zlib')
const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')


const numberToBits = (decimal) => {
  let bits = Array.from(Array(32)).map(bit => 0)
  let number = decimal
  for (let i = 31; i >= 0; i--) {
    console.log(2 ** i, number, i);
    if (number >= 2 ** i) {
      number -= 2 ** i
      bits[i] = 1
    }
  }
  return bits
}

const bitsToNumber = (bits) => {
  let number = 0
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === 1) number += 2 ** i
  }
  return number
}

const applyBitmask = (bitmask, bits) => {
  for (let i = 0; i < bitmask.length; i++) {
    if (bitmask[i] !== "X") {
      bits[i] = bitmask[i]
    }
  }
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

console.log(numberToBits(7));

console.log(bitsToNumber([
  1, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0
]))

console.log(parseBitmask('mask = X000X110XX10101X1011100010X100000X00'))

console.log(parseMemoryAssignment('mem[57364] = 7578011'));