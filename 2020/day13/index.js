const { time } = require('console')
const fs = require('fs')
const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n')

// Copied from https://stackoverflow.com/questions/65275951/implementing-chinese-remainder-theorem-in-javascript
const modularMultiplicativeInverse = (a, modulus) => {
  // Calculate current value of a mod modulus
  const b = BigInt(a % modulus);

  // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
  for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
    if ((b * hipothesis) % modulus == 1n) return hipothesis;
  }
  // If we do not find it, we return 1
  return 1n;
}

const solveCRT = (remainders, modules) => {
  // Multiply all the modulus
  const prod = BigInt(modules.reduce((acc, val) => BigInt(acc) * BigInt(val), 1n));

  return modules.reduce((sum, mod, index) => {
    // Find the modular multiplicative inverse and calculate the sum
    // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus) 
    const p = prod / mod;
    return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p);
  }, 0n) % prod;
}


const findSoonestBus = (arrivalTime, busSchedule) => {
  const arrivalTimeInt = parseInt(arrivalTime)
  const parsedBusSchedule = busSchedule.split(',').filter(bus => bus !== "x").map(time => parseInt(time))
  let minimumTimeDiference = 0
  let closestBusId = 0
  parsedBusSchedule.forEach(bus => {
    let time = bus
    while (time < arrivalTimeInt) time += bus
    if (closestBusId === 0) {
      closestBusId = bus
      minimumTimeDiference = time - arrivalTimeInt
    } else if (time - arrivalTimeInt < minimumTimeDiference) {
      minimumTimeDiference = time - arrivalTimeInt
      closestBusId = bus
    }
  })


  return closestBusId * minimumTimeDiference
}

const findTimeBetweenDepartures = (busSchedule) => {
  const timeBetween = []
  let counter = 0
  busSchedule.split(',').forEach(bus => {

    if (bus !== 'x') {
      timeBetween.push(counter)

    }
    counter++
  })
  return timeBetween
}


const findSubsequentBusDepartures = (busSchedule) => {
  const departureRates = busSchedule.split(',').filter(bus => bus !== "x").map(time => parseInt(time))
  console.log(departureRates);
  const timeBetweenDepartures = findTimeBetweenDepartures(busSchedule)
  console.log(timeBetweenDepartures);
  const moduli = []
  for (let i = 0; i < departureRates.length; i++) {
    moduli.push(departureRates[i] - timeBetweenDepartures[i])
  }
  console.log(moduli);
  return solveCRT(moduli.map(BigInt), departureRates.map(BigInt))
}
//console.log(findSoonestBus(inputData[0], inputData[1])) //Part1
console.log(findSubsequentBusDepartures(inputData[1]));