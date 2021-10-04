const frameDataBase = require("../Data/frameDataBase.json")

const dupNameDifferentiator = (name, characterData) => {
  // \b at start of regex to ensure that we start searching fron the front of the word 
  let regex = "\\b"
  for (let i= 0; i < name.length; i++) {
    regex = regex + name.substring(i, i + 1) + "[ -']?"; 
  }
  const searchName = new RegExp(regex, 'i');


  let nameList = []; 
  frameDataBase.forEach(moveObj => {
    if (!nameList.includes(moveObj.chara)) {
      nameList.push(moveObj.chara)
    }
  })

  let matchedNames = []
  nameList.forEach(name => {
    if (name.match(searchName)) {
      matchedNames.push(name);
    }
  });

  if (matchedNames.length > 1) {
    if (matchedNames.includes('Arcueid Brunestud') && (matchedNames.includes('Red Arcueid'))) {
      console.log("Arcueid Brunestud & Red Arcueid Both Found, Removing Red Arcueid");
      matchedNames = matchedNames.filter(name => (name != "Red Arcueid"));
    }
    // Kohaku & Hisui will be done when Mizuumi finishes with their database finalization
  }

  let searchNameList = matchedNames.map(name => {
    let regex = `^${name}$`
    let searchRealNameList = new RegExp(regex, 'i');
    return searchRealNameList
  })

  let moveObjs = [];
  // To populate moveObjs, which contains Objects where the Object's 'chara' property matches with the searchName regex
  for (let i = 0; i < characterData.length; i++) {
    for (let j = 0; j < searchNameList.length; j++) {
      if (characterData[i]['chara'].match(searchNameList[j])) {
        moveObjs.push(characterData[i])
      }
    }
  }
  return moveObjs;
}




module.exports = dupNameDifferentiator;

// This will return the all the moves of the searched character
// This will ensure that Hisui will not return Kohaku & Hisui
// This will ensure that Kohaku will not return Kohaku & Hisui
// This will ensure that Arc will not return Red Arc