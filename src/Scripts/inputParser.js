const frameDataBase = require("../Data/frameDataBase.json")


const inputParser = (args) => {
  let nameList = [];
  
  frameDataBase.forEach(moveObj => {
    // console.log(moveObj.chara)
    if (nameList.includes(moveObj.chara)) {
      // console.log("moveObj")
      nameList.push(moveList['chara'])
    }
  })

  // console.log(nameList)

  

  let tempName = `${args[0]} ${args[1]}`;
  let moveRegex = new RegExp("^(" + tempName + ")\\b", 'i');
}


inputParser(["Akiha", "5A"])
module.exports = inputParser;