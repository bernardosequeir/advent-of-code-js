const fs = require('fs')

const inputData = fs.readFileSync('input.txt', "utf-8").split("\n")


const decodeInstruction = (instruction) => ({
  code: instruction.split(/\d+/)[0],
  value: parseInt(instruction.split(/[a-zA-Z]/)[1])
})
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

const transverseSpacePart1 = (instructions) => {

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
  })
  return Math.abs(x) + Math.abs(y)
}

const rotateWaypoint = (coordinates, code, value) => {
  if (code === "R") {
    if (value === 90) {
      return { x: coordinates.y, y: - coordinates.x }
    } else if (value === 180) {
      return { x: - coordinates.x, y: - coordinates.y }
    } else if (value === 270) {
      return { x: - coordinates.y, y: coordinates.x }
    }
  } else if (code === "L") {
    if (value === 90) {
      return { x: - coordinates.y, y: coordinates.x }
    } else if (value === 180) {
      return { x: - coordinates.x, y: - coordinates.y }
    } else if (value === 270) {
      return { x: coordinates.y, y: -coordinates.x }
    }
  }
}

const moveWaypoint = (waypointCoordinates, code, value) => {
  if (code === "N") return { x: waypointCoordinates.x, y: waypointCoordinates.y + value }
  if (code === "S") return { x: waypointCoordinates.x, y: waypointCoordinates.y - value }
  if (code === "W") return { x: waypointCoordinates.x - value, y: waypointCoordinates.y }
  if (code === "E") return { x: waypointCoordinates.x + value, y: waypointCoordinates.y }

}

const transverseSpacePart2 = (instructions) => {
  let coordinates = { x: 0, y: 0 }
  let waypointCoordinates = { x: 10, y: 1 }

  instructions.forEach(instruction => {
    const code = instruction.split(/\d+/)[0]
    const value = parseInt(instruction.split(/[a-zA-Z]/)[1])
    if (code === "R" || code === "L") {
      waypointCoordinates = { ...rotateWaypoint(waypointCoordinates, code, value) }

    } else if (code !== "F") {
      waypointCoordinates = { ...moveWaypoint(waypointCoordinates, code, value) }
    } else {
      coordinates.x += waypointCoordinates.x * value
      coordinates.y += waypointCoordinates.y * value
    }
    console.log(waypointCoordinates);
    console.log(coordinates);
  })

  return Math.abs(coordinates.x) + Math.abs(coordinates.y)
}


console.log(transverseSpacePart2(inputData));
