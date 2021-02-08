const fs = require('fs')


let inputData = fs.readFileSync('./input.txt', 'utf-8')

const validPasswordCounterPart1 = (passwordList) => {
  let validPasswords = 0
  passwordList.forEach(password => {
    const parts = password.split(' ')
    const lowerLimit = parts[0].split('-')[0]
    const upperLimit = parts[0].split('-')[1]
    const character = parts[1].split(':')[0]
    const pass = parts[2]
    const letterCount = pass.split(character).length - 1
    if (letterCount >= lowerLimit && letterCount <= upperLimit) { validPasswords++ }
    console.log(pass, letterCount, character);
  })
  return validPasswords
}
const validPasswordCounterPart2 = (passwordList) => {
  let validPasswords = 0
  passwordList.forEach(password => {
    const parts = password.split(' ')
    const lowerPosition = parts[0].split('-')[0] - 1
    const upperPosition = parts[0].split('-')[1] - 1
    const character = parts[1].split(':')[0]
    const pass = parts[2]
    const firstMatch = pass[lowerPosition] === character
    const lastMatch = pass[upperPosition] === character
    if (firstMatch ^ lastMatch) {
      console.log(pass, lowerPosition, upperPosition, character)
      validPasswords++
    }
  })
  return validPasswords
}



console.log(validPasswordCounterPart1(inputData.split("\n")))