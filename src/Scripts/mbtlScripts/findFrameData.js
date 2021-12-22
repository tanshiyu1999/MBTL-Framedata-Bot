const dupNameDifferentiator = require("./dupNameDifferentiator.js");
const mbtlFrameData = require("../../Data/mbtlFrameData.json")



// searchMoves will do a absolute search first.
const searchMoves = (moveObj, move) => {
  // removed all the problematic regex, app should not crash
  move = move.replaceAll(/[\+\.\*\(\)]/g, "")
  move = move.replaceAll(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); 
  move = move.replaceAll(/B\/C/gi, "[BC]") // do not escape the []
  // Generating the Regex 
  let regex = `^[\\.\\~]?${move[0]}[ \\.\\~]?`;

  for (let i = 1; i < move.length; i++) {
    if (i == 0) {
      continue;
    }
    if (move[i] == ' ' || move[i] == '\\') {
      continue;
    }
    regex = regex + move.substring(i , i + 1) + "[ \\.\\~]?";
    
  }
  // Converts A B C into [AX] [BX] [CX] in order to match moves like Ciel's	236X~214X
  regex = regex.replaceAll(/A/gi,'[AX]').replaceAll(/B/gi,'[BX]').replaceAll(/C/gi,'[CX]');

  // regex = move.replaceAll(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

  // If move contains B/C, enables B || C to match with B/C
  if (moveObj['input'].includes("B/C")) {
    regex = regex + "$";
    let moveRegex = new RegExp(regex, 'i');
    let bString = moveObj['input'].replaceAll("B/C", "B");
    let cString = moveObj['input'].replaceAll("B/C", "C");
    if (bString.match(moveRegex) || cString.match(moveRegex)) {
      return moveObj;
    }
  }
  // If move contains A/C, match with 
  if (moveObj['input'].includes("A/C")) {
    regex = regex + "$";
    let moveRegex = new RegExp(regex, 'i');
    let aString = moveObj['input'].replaceAll("A/C", "A");
    let cString = moveObj['input'].replaceAll("A/C", "C");
    if (aString.match(moveRegex) || cString.match(moveRegex)) {
      return moveObj;
    }
  }
  // If move contains A/B, match with 
  if (moveObj['input'].includes("A/B")) {
    regex = regex + "$";
    let moveRegex = new RegExp(regex, 'i');
    let aString = moveObj['input'].replaceAll("A/B", "A");
    let bString = moveObj['input'].replaceAll("A/B", "B");
    if (aString.match(moveRegex) || bString.match(moveRegex)) {
      return moveObj;
    }
  }
  
  // If move contains 4/6, like grab mores. Replace 4/6 with 4 and 6
  // Allows AD to match with 4/6AD as well
  if (moveObj['input'].includes("4/6")) {
    regex = regex + "$";
    let moveRegex = new RegExp(regex, 'i');
    let aString = moveObj['input'].replaceAll("4/6", "4");
    let bString = moveObj['input'].replaceAll("4/6", "6");
    if (aString.match(moveRegex) || bString.match(moveRegex)) {
      return moveObj;
    }
    let noDirectionString = moveObj['input'].replaceAll("4/6", "");
    if (noDirectionString.match(moveRegex)) {
      return moveObj
    }
  }



  let moveRegex = new RegExp(regex, 'i');
  
  if (moveObj['input'].match(moveRegex) || moveObj['name'].match(moveRegex)) {
    console.log(`Regex Match: ${moveObj['chara']}'s ${moveObj['input']}`)
    return moveObj;
  }
  return null;
}

// searchAbsoluteMoves will 
const searchAbsoluteMoves = (moveObj, move) => {
  move = move.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

  let absoluteMoveRegex = new RegExp("^(" + move + ")$", 'i');
  if (moveObj['name']) {
    if (moveObj['name'].match(absoluteMoveRegex) || moveObj['input'].match(absoluteMoveRegex)) {
      console.log("Absolute Match: ", moveObj['input']);
      return moveObj;
    }
  } else {
    if (moveObj['input'].match(absoluteMoveRegex)) {
      console.log(`Absolute Match: ${moveObj['chara']}'s ${moveObj['input']}`);
      return moveObj;
    }
  }
}


// Search data will search through all the character data and return found matches
const searchData = async (name, move) => {
  let characterData = mbtlFrameData;
  
  let moveObjs = dupNameDifferentiator(name, characterData)

  let matched = [];
  // Match with the moves of the characters absolutely. Avoiding matches with 6BC with 6B
  moveObjs.forEach(moveObj => {
    let absoluteReturned = searchAbsoluteMoves(moveObj, move);
    if (absoluteReturned) {
      matched.push(absoluteReturned);
    }
  });


  // Match with the moves of characters via regex.
  if (matched.length == 0) {
    moveObjs.forEach(moveObj => {
      let returned = searchMoves(moveObj, move);
      if (returned) {
        matched.push(returned);
      };
    })
  }

  // Return the data to the Command (f.js atm)
  if (matched.length == 0) {
    console.log("No match")
    return false;
  } else if (matched.length == 1) {
    console.log("Single Match Found")
  } else {
    console.log("Multiple Matches Found")
  }
  return matched;

}

module.exports = searchData;

