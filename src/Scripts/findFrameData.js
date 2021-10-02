const frameDataBase = require("../Data/frameDataBase.json")



// searchMoves will do a absolute search first.
const searchMoves = (moveObj, move) => {
  move = move.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  // Generating the Regex 
  let regex = `^[ \\.\\~]?[${move[0]}][ \\.\\~]?`;
  for (let i = 1; i < move.length; i++) {
    if (i == 1) {
      regex = regex + "[ \\.\\~]?";
    }
    if (move[i] == ' ' || move[i] == '.') {
      continue;
    }
    regex = regex + move.substring(i , i + 1) + "[ \\.\\~]?";
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


// searchData() will search for character name, remember the search name
const searchData = async (name, move) => {
  let characterData = frameDataBase;

  // \b at start of regex to ensure that we start searching fron the front of the word
  let regex = "\\b"
  for (let i= 0; i < name.length; i++) {
    regex = regex + name.substring(i, i + 1) + "[ -']?"; 
  }
  
  const searchName = new RegExp(regex, 'i');

  let matched = [];
  let moveObjs = [];
  // This matches with the character.
  for (let i = 0; i < characterData.length; i++) {
    if (characterData[i]['chara'].match(searchName)) {
      moveObjs.push(characterData[i])
    }
  }

  
  moveObjs.forEach(moveObj => {
    let absoluteReturned = searchAbsoluteMoves(moveObj, move);
    if (absoluteReturned) {
      matched.push(absoluteReturned);
    }
  });


  // Search for regex matches
  if (matched.length == 0) {
    moveObjs.forEach(moveObj => {
      let returned = searchMoves(moveObj, move);
      if (returned) {
        matched.push(returned);
      };
    })
  }

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

