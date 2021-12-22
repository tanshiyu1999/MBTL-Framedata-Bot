
const dupNameDifferentiator = (name, characterData) => {
  const frameDataBase = require("../Data/frameDataBase.json")
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

  // Will filter Dup names when matched with multiple things.
  if (matchedNames.length > 1) {
    // Arc and Red Arc 
    if (matchedNames.includes('Arcueid Brunestud') && (matchedNames.includes('Red Arcueid'))) {
      console.log("Arcueid Brunestud & Red Arcueid Both Found, Removing Red Arcueid");
      matchedNames = matchedNames.filter(name => (name != "Red Arcueid"));
    }
    // Kohaku & Hisui and Hisui
    if (matchedNames.includes('Hisui') && (matchedNames.includes('Hisui & Kohaku'))) {
      console.log("Hisui & Hisui & Kohaku Both Found, Hisui & Kohaku");
      matchedNames = matchedNames.filter(name => (name != "Hisui & Kohaku"));
    }
    // Kohaku & Hisui and Kohaku
    if (matchedNames.includes('Kohaku') && (matchedNames.includes('Hisui & Kohaku'))) {
      console.log("Kohaku & Hisui & Kohaku Both Found, Hisui & Kohaku");
      matchedNames = matchedNames.filter(name => (name != "Hisui & Kohaku"));
    }

  }

  // for all the matchedName, create a list of regex like /^name$/i
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