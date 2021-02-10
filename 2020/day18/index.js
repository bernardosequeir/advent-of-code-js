const fs = require('fs')

const parseData = () => {
  const file = fs.readFileSync('input.txt', 'utf-8')
  return file.split('\n').map(line => {
    const symbols = line.split('').filter(char => char !== ' ')
    return symbols
  })

}

const solve = (data) => {
  let expressionsSum = 0
  for (let expression of data)
    expressionsSum += calculateExpressionPart2(expression)
  return expressionsSum
}

const calculateExpressionPart1 = (symbols) => {
  console.log(symbols);
  if (symbols.includes('(')) {
    let tries = 1
    while (symbols.indexOf('(') !== -1 /*&& tries > 0*/) {
      let openingParenthesesIndex = symbols.indexOf('(')
      let closingParenthesesIndex = findMatchingClosingParentheses(symbols, openingParenthesesIndex)
      let parcel = calculateExpressionPart1(symbols.slice(openingParenthesesIndex + 1, closingParenthesesIndex))
      symbols.splice(openingParenthesesIndex, closingParenthesesIndex - openingParenthesesIndex + 1, parcel)
      tries--
    }
  }
  let expressionValue = parseInt(symbols[0])
  for (let i = 1; i < symbols.length; i += 2) {
    let operation = symbols[i]
    let secondOperator = parseInt(symbols[i + 1])
    console.log(expressionValue, operation, secondOperator)
    if (operation === "+") {
      expressionValue += secondOperator
    } else if (operation === "*") {
      expressionValue *= secondOperator
    }
    console.log(expressionValue);
  }
  return expressionValue
}

const findMatchingClosingParentheses = (symbols, openingIndex) => {
  let openingCount = 1
  let closingCount = 0
  for (let i = openingIndex + 1; i < symbols.length; i++) {
    if (symbols[i] === '(') {
      openingCount++
    } else if (symbols[i] === ')') {
      closingCount++
      if (openingCount === closingCount) {
        return i
      }
    }
  }
  return -1
}

const calculateExpressionPart2 = (symbols) => {
  if (symbols.includes('(')) {
    while (symbols.includes('(')) {
      let openingParenthesesIndex = symbols.indexOf('(')
      let closingParenthesesIndex = findMatchingClosingParentheses(symbols, openingParenthesesIndex)
      let parcel = calculateExpressionPart2(symbols.slice(openingParenthesesIndex + 1, closingParenthesesIndex))
      symbols.splice(openingParenthesesIndex, closingParenthesesIndex - openingParenthesesIndex + 1, parcel)
    }
  }
  while (symbols.includes('+')) {
    for (let i = 0; i < symbols.length && symbols.includes('+'); i++) {
      if (symbols[i] === '+') {
        let parcel = parseInt(symbols[i - 1]) + parseInt(symbols[i + 1])
        symbols.splice(i - 1, 3, parcel)
      }
      console.log(symbols);
    }
  }
  if (symbols.length === 1) {
    return parseInt(symbols[0])
  }
  else {
    return symbols.filter(symbol => symbol !== '*').map(Number).reduce((a, b) => a * b, 1)
  }
}



console.log(solve(parseData()))