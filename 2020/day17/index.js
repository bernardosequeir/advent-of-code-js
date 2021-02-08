const fs = require('fs')

const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')

// code referenced from https://github.com/azablan/advent-of-code-2020/blob/main/walkthrough/d17/part1.js

const solve = () => {
  const lines = inputData
  let state = getActiveNodes(lines)

  for (let i = 0; i < 6; i++) {
    state = stepSimulation(state)
  }

  return state.size
}

const stepSimulation = (activeNodes) => {

  const newNodes = new Set()

  const activationCounts = {};

  for (let node of activeNodes) {
    const neighbors = getNeighbors(node)
    let activeNeighborCount = 0

    for (let neighbor of neighbors) {
      if (activeNodes.has(neighbor)) {
        activeNeighborCount++
      } else {
        if (!(neighbor in activationCounts)) {
          activationCounts[neighbor] = 0;
        }
        activationCounts[neighbor]++
      }
    }

    if (activeNeighborCount === 2 || activeNeighborCount === 3) {
      newNodes.add(node)
    }
  }

  for (let potentialNode in activationCounts) {
    if (activationCounts[potentialNode] === 3) {
      newNodes.add(potentialNode)
    }
  }

  return newNodes
}

const getActiveNodes = (lines) => {
  const nodes = new Set()
  for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[x].length; y++) {
      const char = lines[x][y]
      if (char === "#") {
        const node = getNodeFromArray([x, y, 0, 0])
        nodes.add(node)
      }
    }
  }
  return nodes;
}

const getNodeFromArray = (coordinates) => {
  return coordinates.join(',')
}

const getNeighbors = (node) => {
  const [x, y, z, w] = node.split(',').map(Number)
  const neighbors = new Set()

  for (let deltaX = -1; deltaX <= 1; deltaX += 1) {
    for (let deltaY = -1; deltaY <= 1; deltaY += 1) {
      for (let deltaZ = -1; deltaZ <= 1; deltaZ += 1) {
        for (let deltaW = -1; deltaW <= 1; deltaW += 1) {
          const neighbor = getNodeFromArray([x + deltaX, y + deltaY, z + deltaZ, w + deltaW])
          neighbors.add(neighbor)
        }
      }
    }
  }

  neighbors.delete(node)
  return neighbors
}

console.log(solve(inputData))