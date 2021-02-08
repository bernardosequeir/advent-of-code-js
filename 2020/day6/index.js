const fs = require('fs');

let inputData = fs.readFileSync('./input.txt', 'utf-8').split('\n\n') //already splitting by groups

let countGroupAnswersPart1 = (groupAnswers) => {
  let answerCount = groupAnswers.map(group => {
    const answers = group.split('\n').join('') // getting all the answers that span multiple lines into just one big string
    return new Set(answers).size
  })
  return answerCount.reduce((sum, element) => sum + element, 0)
}

let countGroupAnswersPart2 = (groupAnswers) => {
  let answerCount = groupAnswers.map(group => {
    const answers = group.split('\n')
    const firstAnswer = answers[0].split('')
    let sum = 0
    for (let i = 0; i < firstAnswer.length; i++) {
      if (answers.every(answer => answer.indexOf(firstAnswer[i]) != -1)) sum++
    }
    return sum
  })
  return answerCount.reduce((sum, element) => sum + element, 0)
}
console.log(countGroupAnswersPart1(inputData))
console.log(countGroupAnswersPart2(inputData))