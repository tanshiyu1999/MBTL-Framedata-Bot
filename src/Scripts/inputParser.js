const frameDataBase = require("../Data/frameDataBase.json")
const charNameShorthandParser = require("./charNameShorthandParser.js")


const splitNameParser = (tempName, nameList) => {
  let wordsLen = tempName.split(' ').length;
  let shortenedNameList = [];
  for (let i = 0; i < nameList.length; i++) {
    if (nameList[i].split(' ').length >= wordsLen) {
      var nameArr = nameList[i].split(' ');
      shortenedNameList.push(nameArr.splice(0,wordsLen).join(' '));
    }
  }
  return shortenedNameList;
}

const absoluteNameFinder = (tempName, nameList) => {
  nameList = splitNameParser(tempName, nameList)
  tempName = tempName.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');

  let searchName = new RegExp("^(" + tempName + ")$", 'i');
  // console.log(searchName)
  
  for (let i = 0; i < nameList.length; i++) {
    if (nameList[i].match(searchName)) {
      return true;
    }
  }
}

const regexNameFinder = (tempName, nameList) => {
  tempName = tempName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  let regex = "\\b"
  for (let i = 0; i < tempName.length; i++) {
    regex = regex + tempName.substring(i, i + 1) + "[ -']?";
  };
  const searchName = new RegExp(regex, 'i');

  for (let i = 0; i < nameList.length; i++) {
    if (nameList[i].match(searchName)) {
      return true;
    } 
  }
}


const inputParser = (args) => {
  let outputArgs = [];
  let tempArgs = [...args]

  let shortHandArgs = charNameShorthandParser(tempArgs);
  console.log(shortHandArgs)
  console.log(args)
  if (shortHandArgs != args) {
    console.log("hello")
    console.log(shortHandArgs)
    let outputString = shortHandArgs.shift();
    let outputMove = shortHandArgs.join(' ');
    outputArgs.push(outputString);
    outputArgs.push(outputMove)
    return outputArgs;
  }

  // console.log(args)
  let outputString;

  let nameList = []; 
  frameDataBase.forEach(moveObj => {
    if (!nameList.includes(moveObj.chara)) {
      nameList.push(moveObj.chara)
    }
  })
 
  let tempName = "";
  for (let i = 0; i < args.length; i++) {
    
    if (i == 0) {
      tempName = args[i]
      var isTrue = regexNameFinder(tempName, nameList);
    } else {
      tempName = tempName + " " + args[i];
      var isTrue = absoluteNameFinder(tempName, nameList);
    }

    if (isTrue) {
      if ( i == 0 ) {
        outputString = args[i]
      } else {
        outputString = outputString + " " + args[i]
      }
      continue;
    } else {
      args.splice(0, i)
      let outputMove = args.join(' ');
      outputArgs.push(outputString);
      outputArgs.push(outputMove)
      break;
    }
  }
  console.log(`Output arguments: \n1st Output: ${outputArgs[0]}\n2nd Output: ${outputArgs[1]}`);
  return outputArgs;
}


module.exports = inputParser;

// This will check through the names
// First word will be regex match
// Second words onwards will be absolute match
// This will return 2 outputs
// First output is the character's name
// Second output is the character's move