const { arrayBuffer } = require("stream/consumers");
const charNameShorthandParser = require("./charNameShorthandParser.js")

// Split name parser returns an array with the shortened name.
// nameList contains the names of all searchable characters
const splitNameParser = (tempName, nameList) => {
  // Looks at length of the name.
  let wordsLen = tempName.split(' ').length;
  let shortenedNameList = [];
  for (let i = 0; i < nameList.length; i++) {
    // If the wordLen of character is longer or equal to wordLen of the tempName
    if (nameList[i].split(' ').length >= wordsLen) {
      // Split the name into array
      var nameArr = nameList[i].split(' ');
      // Append the name (after it has joined back) into shortenedNameList, where the name will have same word length as the tempName for absoluteNameFinder
      shortenedNameList.push(nameArr.splice(0, wordsLen).join(' '));
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
  // Escape all these special characters
  tempName = tempName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  // Ensure that the search begins at the front of the name
  let regex = "\\b"
  // This is to make sure that the regex search ignores spaces, - and '
  for (let i = 0; i < tempName.length; i++) {
    regex = regex + tempName.substring(i, i + 1) + "[ -']?";
  };
  const searchName = new RegExp(regex, 'i');

  // if name matches, return true.
  for (let i = 0; i < nameList.length; i++) {
    if (nameList[i].match(searchName)) {
      return true;
    } 
  }
}

// Function is used in input parser
// Will return an array with 2 elements [charactername, charactermove]
const inputParser = (args) => {
  const mbtlFrameData = require("../../Data/mbtlFrameData.json")
  let outputArgs = [];

  // Create a temporary argument to be used as input for charNameShorthandParser
  let tempArgs = [...args]
  // If shorthand name is used, it will return a shortHandArgs. If not, it will return an unaltered tempArgs.
  let shortHandArgs = charNameShorthandParser(tempArgs);

  // If shorthand is used, if statement returns true
  // This will return output of [charactername, charactermove]
  if (shortHandArgs.join("") != args.join("")) {
    console.log("Shorthand Found.")
    let outputString = shortHandArgs.shift();
    let outputMove = shortHandArgs.join(' ');
    outputArgs.push(outputString);
    outputArgs.push(outputMove);
    // console.log(`Output arguments: \n1st Output: ${outputArgs[0]}\n2nd Output: ${outputArgs[1]}`);
    return outputArgs;
  }

  // console.log(args)
  let outputString;

  // Generate a an array with all the character names.
  let nameList = []; 
  mbtlFrameData.forEach(moveObj => {
    if (!nameList.includes(moveObj.chara)) {
      nameList.push(moveObj.chara)
    }
  })
  
  let tempName = "";
  // For each argment in the args array,
  for (let i = 0; i < args.length; i++) {
    // if first argument is used, regex search the first argument
    // if not, add the next index to the tempname and use absolute search
    if (i == 0) {
      tempName = args[i]
      var isTrue = regexNameFinder(tempName, nameList);
    } else {
      tempName = tempName + " " + args[i];
      var isTrue = absoluteNameFinder(tempName, nameList);
    }

    // If there is an returned value from the regex or absolute search
    if (isTrue) {
      // if is the first argument, outputString = first Argument
      // else, the argument will be added to the outputstring
      if ( i == 0 ) {
        outputString = args[i]
      } else {
        outputString = outputString + " " + args[i]
      }

      // If all character name matches with argument
      if (i === args.length - 1) {
        outputArgs.push(outputString);
        outputArgs.push(undefined);
        return outputArgs;
      }


      continue;
    } else {
      // When the regex and absolute search does not return anything, it means the previous argument are character name and the current input is not
      // Therefore, outputString formed from the above if statement is the charactername
      // the rest of the argument in the args belongs to the character move.
      args.splice(0, i)
      let outputMove = args.join(' ');
      outputArgs.push(outputString);
      outputArgs.push(outputMove)
      break;
    }
  }

  return outputArgs;
}


module.exports = inputParser;

// This will check through the names
// First word will be regex match
// Second words onwards will be absolute match
// This will return 2 outputs
// First output is the character's name
// Second output is the character's move