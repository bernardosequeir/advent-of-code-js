const fs = require('fs')

const inputData = fs.readFileSync('./input.txt', 'utf-8')

const parseBagList = () => {
  const bags = inputData.split('\n')
  const filtered_bags = bags.map(bag => {
    const list = bag.split(/(bags|bag)/)
    const reduced_list = list.filter(list => !list.match(/bags|bag|\.|no/))
    const bagData = { baseBag: '', bagsInside: {} }
    reduced_list.forEach(color => {
      if (color.indexOf("contain") !== -1) {
        let bagColor = color.split("contain ")[1].split(/\d+/)[1].trim()
        let bagNumber = color.split("contain ")[1].split(" ")[0]
        bagData.bagsInside = { ...bagData.bagsInside, [bagColor]: bagNumber }
      }
      else if (color.indexOf(", ") !== -1) {
        let bagColor = color.split(", ")[1].split(/\d+/)[1].trim()
        let bagNumber = color.split(", ")[1].split(" ")[0]
        bagData.bagsInside = { ...bagData.bagsInside, [bagColor]: bagNumber }
      } else {

        bagData.baseBag = color.trim()
      }
    })
    return bagData
  })
  return filtered_bags
}


const findBagsThatCanContain = (bagColor, bagList) => {
  let cache = {}
  let bagsThatCanContain = []
  bagList.forEach(bag => {
    console.log(bag);
    if (bag.baseBag in cache) {
      if (cache[bag.baseBag]) {
        bagsThatCanContain = { ...bagsThatCanContain, bag }
      }
    }
    else {
      if (bagContains(bag, bagColor, cache)) bagsThatCanContain.push(bag)
    }
  })
  console.log("cache: ", cache);
  return bagsThatCanContain


}



const bagContains = (bag, bagColor, cache = {}) => {
  console.log(bag);
  if (bagColor in bag.bagsInside) {
    cache = { ...cache, [bag.baseBag]: true }
    return true
  } else {
    bag.bagsInside
  }

}
const parsedBags = parseBagList()

console.log(findBagsThatCanContain("shiny gold", parsedBags))