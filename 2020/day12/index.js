const fs = require('fs')

const inputData = fs.readFileSync('input.txt', "utf-8").split("\n")

const parseInstruction = (instruction, currentDirection) => {
  const code = instruction.split(/\d+/)[0]
  const value = parseInt(instruction.split(/[a-zA-Z]/)[1])

  let newX = 0
  let newY = 0
  if (code === "F") {
    if (currentDirection === "N") {
      newY += value
    } else if (currentDirection === "S") {
      newY -= value
    } else if (currentDirection === "E") {
      newX += value
    } else {
      newX -= value
    }
  } else if (code === "N") {
    newY += value
  } else if (code === "S") {
    newY -= value
  } else if (code === "E") {
    newX += value
  } else if (code === "W") {
    newX -= value
  } else {
    currentDirection = calculateDirection(currentDirection, code, value)
  }

  return { newX, newY, currentDirection }
}

const calculateDirection = (currentDirection, code, value) => {
  if (currentDirection === "N") {
    return code === "R"
      ? value === 90
        ? "E"
        : value === 180
          ? "S"
          : "W"
      : value === 90
        ? "W"
        : value === 180
          ? "S"
          : "E"
  } else if (currentDirection === "E") {
    return code === "R"
      ? value === 90
        ? "S"
        : value === 180
          ? "W"
          : "N"
      : value === 90
        ? "N"
        : value === 180
          ? "W"
          : "S"
  } else if (currentDirection === "S") {
    return code === "R"
      ? value === 90
        ? "W"
        : value === 180
          ? "N"
          : "E"
      : value === 90
        ? "E"
        : value === 180
          ? "N"
          : "W"
  } else if (currentDirection === "W") {
    return code === "R"
      ? value === 90
        ? "N"
        : value === 180
          ? "E"
          : "S"
      : value === 90
        ? "S"
        : value === 180
          ? "E"
          : "N"
  }


}

const transverseSpace = (instructions) => {

  let currentDirection = "E"

  let startingX = 0
  let startingY = 0
  let x = 0
  let y = 0

  instructions.forEach(instruction => {
    newDirections = parseInstruction(instruction, currentDirection)
    x += newDirections.newX
    y += newDirections.newY
    currentDirection = newDirections.currentDirection
    console.log(x, y, currentDirection);
  })
  return Math.abs(x) + Math.abs(y)
}

console.log(transverseSpace(inputData))