const fs = require('fs');

let inputData = fs.readFileSync('./input.txt', 'utf-8')


const checkByr = (byr) => byr ? byr.length === 4 && byr >= 1920 && byr <= 2002 : false
const checkIyr = (iyr) => iyr ? iyr.length === 4 && iyr >= 2010 && iyr <= 2020 : false
const checkEyr = (eyr) => eyr ? eyr.length === 4 && eyr >= 2020 && eyr <= 2030 : false

const checkHgt = (hgt) => {
  if (!hgt) return false
  if (hgt.includes('cm')) {
    const height = hgt.split('cm')[0]
    return height >= 150 && height <= 193
  } else if (hgt.includes('in')) {
    const height = hgt.split('in')[0]
    console.log(height)
    return height >= 59 && height <= 76
  }
  return false
}

const checkHcl = (hcl) => hcl ? /#[a-f0-9]{6}/.test(hcl) : false

const checkEcl = (ecl) => ecl ? ecl.length === 3 && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl) : false

const checkPid = (pid) => pid ? /[0-9]{9}/.test(pid) && pid.length === 9 : false
const countValidPassportsPart1 = (passportList) => {
  const fieldsToCheck = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt']
  let validPassports = 0

  passportList.forEach(passport => {
    if (fieldsToCheck.every(field => passport.includes(field))) {
      validPassports++
    }
  })
  return validPassports
}
const countValidPassportsPart2 = (passportList) => {
  let validPassports = 0

  passportList.forEach(passport => {
    const codes = []
    passport.split('\n').forEach(line => {
      codes.push(...line.split(' '))
    })
    const byr = codes.find(code => code.includes('byr')) ? codes.find(code => code.includes('byr')).split('byr:')[1] : null
    const iyr = codes.find(code => code.includes('iyr')) ? codes.find(code => code.includes('iyr')).split('iyr:')[1] : null
    const eyr = codes.find(code => code.includes('eyr')) ? codes.find(code => code.includes('eyr')).split('eyr:')[1] : null
    const hgt = codes.find(code => code.includes('hgt')) ? codes.find(code => code.includes('hgt')).split('hgt:')[1] : null
    const hcl = codes.find(code => code.includes('hcl')) ? codes.find(code => code.includes('hcl')).split('hcl:')[1] : null
    const ecl = codes.find(code => code.includes('ecl')) ? codes.find(code => code.includes('ecl')).split('ecl:')[1] : null
    const pid = codes.find(code => code.includes('pid')) ? codes.find(code => code.includes('pid')).split('pid:')[1] : null

    if (checkByr(byr) && checkIyr(iyr) && checkEyr(eyr) && checkHgt(hgt) && checkHcl(hcl) && checkEcl(ecl) && checkPid(pid)) {
      validPassports++
    }
  })
  return validPassports
}



console.log(countValidPassportsPart2(inputData.split('\n\n')))