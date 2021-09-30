const fetchedData = require("./fetchData.js")


const searchMoves = async (moveObj, move) => {
  let matched = [];

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
    console.log(moveObj)
  }
}

const searchData = async (name, move) => {
  let characterData = await fetchedData();

  // \b at start of regex to ensure that we start searching fron the front of the word
  let regex = "\\b"
  for (let i= 0; i < name.length; i++) {
    regex = regex + name.substring(i, i + 1) + "[ -']?"; 
  }
  
  const searchName = new RegExp(regex, 'i');

  characterData.forEach(moveObj => {
    let match = moveObj['chara'].match(searchName);
    if (match) {
      searchMoves(moveObj, move);
    }
  })


  console.log(name)
  console.log(move)

}

searchData("Akiha", "214A")