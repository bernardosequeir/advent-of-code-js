const fs = require('fs')

let inputData = fs.readFileSync('./input.txt', 'utf-8')


const convertMap = (input) => {
  const lines = input.split('\n')
  let map = []
  lines.forEach(line => {
    map.push(line.split(''))
  });
  return map
}

const transverseMap = (map, downDirection, rightDirection) => {
  let map_width = map[0].length
  let map_height = map.length
  let y = 0
  let x = 0
  let treeCount = 0
  while (y < map_height - 1) {
    y += downDirection
    x = (x + rightDirection) % map_width
    if (map[y][x] === '#') {
      treeCount++
    }
  }
  return treeCount
}

let map = convertMap(inputData)
const down1right3 = transverseMap(map, 1, 3)
const down1right1 = transverseMap(map, 1, 1)
const down1right5 = transverseMap(map, 1, 5)
const down1right7 = transverseMap(map, 1, 7)
const down2right1 = transverseMap(map, 2, 1)

console.log(down1right1 * down1right3 * down1right5 * down1right7 * down2right1);