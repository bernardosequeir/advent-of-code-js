const fs = require('fs')

const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n\n')

const parseFields = (fields) => {
  const fieldCollection = fields.split('\n').map(field => {
    let field1 = field.split(' ')[1]
    let field2 = field.split(' ')[3]
    return [field1.split('-').map(Number), field2.split('-').map(Number)]
  })
  return fieldCollection
}

const findErrorRate = (fieldList, fields) => {
  let errorRate = 0
  fields.forEach(field => {
    let passed = false
    for (let i = 0; i < fieldList.length; i++) {
      let firstBoundaries = fieldList[i][0]
      let secondBoundaries = fieldList[i][1]
      console.log(firstBoundaries, secondBoundaries);
      if ((field >= firstBoundaries[0] && field <= firstBoundaries[1]) || (field >= secondBoundaries[0] && field <= secondBoundaries[1])) {
        passed = true
      }
    }
    if (!passed) errorRate = field
  })
  return errorRate;
}


const parseTickets = (tickets) => tickets.split('\n').map(ticket => ticket.split(',').map(Number))

const findTicketScanningErrorRate = (fields, myTicket, nearbytickets) => {

  const parsedFields = parseFields(fields)
  const myTicketParsed = parseTickets(myTicket)
  const nearbyTicketsParsed = parseTickets(nearbytickets)
  myTicketParsed.shift()
  nearbyTicketsParsed.shift()
  let errorRate = 0
  nearbyTicketsParsed.forEach(ticket => {
    errorRate += findErrorRate(parsedFields, ticket)
  })
  return errorRate
}


console.log(findTicketScanningErrorRate(inputData[0], inputData[1], inputData[2]))