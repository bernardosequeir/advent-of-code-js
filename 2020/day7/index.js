const fs = require('fs')

const inputData = fs.readFileSync('./input.txt', 'utf-8')

const parseBagList = (bagList) => {
  const bags = inputData.split('\n')
  const filtered_bags = bags.map(bag => {
    const list = bag.split(/(bags|bag)/)
    const reduced_list = list.filter(list => !list.match(/bags|bag|\.|no/))
    const colors_only = reduced_list.map(color => {
      if (color.indexOf("contain") !== -1) {
        let bagColor = color.split("contain ")[1].split(/\d+/)[1].trim()
        let bagNumber = color.split("contain ")[1].split(" ")[0]
        return { [bagColor]: bagNumber }
      }
      else if (color.indexOf(", ") !== -1) {
        let bagColor = color.split(", ")[1].split(/\d+/)[1].trim()
        let bagNumber = color.split(", ")[1].split(" ")[0]
        return { [bagColor]: bagNumber }
      }
      return { baseBag: color.trim() }
    })
    return colors_only
  })
  console.log(filtered_bags);
}

parseBagList(inputData)