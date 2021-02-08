const fs = require('fs')

const parseData = () => {
  const file = fs.readFileSync('input.txt', 'utf-8')
  return file.split('\n')
}

const solve = (data) => {
  let expressionsSum = 0
  for (let expression of data)
    expressionsSum += calculateExpression(expression)
  return expressionsSum
}

const calculateExpression = (expression) => {
  const symbols = expression.split(" ")
  let expressionValue = parseInt(symbols[0])
  if (symbols.find(symbol => symbol === "(")) {
    while (symbols.find(symbol => symbol === "(")) {
      let openingParenthesesIndex = symbols.indexOf('(')
      let closingParenthesesIndex = symbols.indexOf(')')
    }
  } else {
    for (let i = 1; i < symbols.length; i += 2) {
      let operation = symbols[i]
      let secondOperator = parseInt(symbols[i + 1])
      if (operation === "+") {
        expressionValue += secondOperator
      } else if (operation === "*") {
        expressionValue *= secondOperator
      }
      console.log(expressionValue, operation, secondOperator)
      console.log(expressionValue);
    }

  }
  return expressionValue
}

console.log(solve(parseData()))