import * as fs from 'fs'
const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(Number)

const part1 = (input : number[]) => {
    let numberOfIncreases = 0
    for(let i = 1; i < input.length; i++){
        if(input[i] > input[i-1]) numberOfIncreases++
    }
    return numberOfIncreases
}

const part2 = (input : number[]) => {
    let numberOfIncreases = 0
    let lastSum = input[0] + input[1] + input[2]
    for(let i = 3; i < input.length; i++){
        const newSum = input[i] + input[i-1] + input[i-2]
        if(newSum > lastSum) numberOfIncreases++
        lastSum = newSum
    }
    return numberOfIncreases
}

console.log(part1(input));
console.log(part2(input));