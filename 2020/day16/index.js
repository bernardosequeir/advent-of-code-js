const fs = require('fs')

const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n\n')

const parseFields = (fields) => {
  const fieldCollection = fields.split('\n').map(field => {
    const separatedFields = field.split(':')
    let description = separatedFields[0]
    let field1 = separatedFields[1].split(' ')[1]
    let field2 = separatedFields[1].split(' ')[2]
    return { description, fields: [field1.split('-').map(Number), field2.split('-').map(Number)] }
  })
  return fieldCollection
}

const findErrorRate = (fieldList, fields) => {
  let errorRate = 0
  fields.forEach(field => {
    let passed = false
    for (let i = 0; i < fieldList.length; i++) {
      let firstBoundaries = fieldList[i].fields[0]
      let secondBoundaries = fieldList[i].fields[1]
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

const getFieldOrder = (fields, validNearbyTickets) => {
  const fieldOrder = {}
  fields.forEach(field => fieldOrder[field.description] = [])
  validNearbyTickets.forEach(ticket => {
    for (let j = 0; j < ticket.length; j++) {
      for (let i = 0; i < fields.length; i++) {
        let firstBoundaries = fields[i].fields[0]
        let secondBoundaries = fields[i].fields[1]
        if ((ticket[j] >= firstBoundaries[0] && ticket[j] <= firstBoundaries[1]) || (ticket[j] >= secondBoundaries[0] && ticket[j] <= secondBoundaries[1])) {
          if (fieldOrder[fields[i].description].indexOf(j) === -1) fieldOrder[fields[i].description].push(j)
        }
      }
    }
  })
  let tries = 0
  while (tries < 40 && !Object.values(fieldOrder).every(value => value.length === 1)) {
    for (let i = 0; i < Object.keys(fieldOrder).length; i++) {
      let fieldCandidates = Object.values(fieldOrder)[i]
      if (fieldCandidates.length !== 1) {
        fieldCandidates.forEach(candidate => {
          /*if (Object.values(fieldOrder).find(element => element.length === 1 && element[0] === candidate) && fieldCandidates.length !== 1) {
            console.log(candidate);
            fieldCandidates.splice(candidate, 1)
          }*/
          if (Object.values(fieldOrder).some(fields => {
            return fields.indexOf(candidate) !== -1
          }) === true) {
            fieldCandidates.splice(candidate, 1)
          }
        })
      }
    }
    tries++
  }
  console.log(fieldOrder);
  return fieldOrder
}

const getColumnValues = (fields, myTicket, nearbytickets) => {
  const parsedFields = parseFields(fields)
  const myTicketParsed = parseTickets(myTicket)
  const nearbyTicketsParsed = parseTickets(nearbytickets)
  myTicketParsed.shift()
  nearbyTicketsParsed.shift()
  const validNearbyTickets = nearbyTicketsParsed.filter(ticket => findErrorRate(parsedFields, ticket) === 0)

  const fieldOrder = getFieldOrder(parsedFields, validNearbyTickets)
  console.log(fieldOrder);

}

console.log(getColumnValues(inputData[0], inputData[1], inputData[2]))