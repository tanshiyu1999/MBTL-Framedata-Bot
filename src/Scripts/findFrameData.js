const fetchedData = require("./fetchData.js")


const searchMoves = (moveObj, move) => {
  // Generating the Regex 
  let regex = `^[ \\[\\]\\.]?[${move[0]}][ \\[\\]\\.]?`;
  for (let i = 1; i < move.length; i++) {
    if (i == 1) {
      regex = regex + "[ \\[\\]\\.]?";
    }
    if (move[i] == ' ' || move[i] == '.') {
      continue;
    }
    regex = regex + move.substring(i , i + 1) + "[ \\[\\]\\.]?";
  }
  let moveRegex = new RegExp(regex, 'i');
  
  if (moveObj['input'].match(moveRegex) || moveObj['name'].match(moveRegex)) {
    console.log(`Matched move: ${moveObj['chara']}'s ${moveObj['input']}`)
    return moveObj;
  }
  return null;
}

const searchData = async (name, move) => {
  let characterData = await fetchedData();

  // \b at start of regex to ensure that we start searching fron the front of the word
  let regex = "\\b"
  for (let i= 0; i < name.length; i++) {
    regex = regex + name.substring(i, i + 1) + "[ -']?"; 
  }
  
  const searchName = new RegExp(regex, 'i');

  let matched = [];
  characterData.forEach(moveObj => {
    let match = moveObj['chara'].match(searchName);
    if (match) {
      let returned = searchMoves(moveObj, move);
      if (returned) {
        matched.push(returned);
      }
    }
  })

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

// In future iteration, the searchData() function will accept an array []
// It will check for name match in the example below
// array = [Akiho Tohno Meow Woof 236K]
// Check if Akiho match with names
// if yes, Check if Akiho Tohno match with names and so for...
// Akiho Tohno Meow does not match with any names.
// Meow Woof 236K becomes the move variable
// Akiho Tohno becomes name variable

// If first argument cannot find name. Combine all of the arguments and find input/skill name
