// Input is a single object
// This function is called from Scripts/outputDiscord.js
// moveObj is a single object containing the information regarding the single matched move
const makeFields = (moveObj) => {
  let keys = Object.keys(moveObj);

  // Setting up temporary variable to hold values in the for loop later.
  let tempObj = {};
  let dataOutput = [];
  let imageOutput = [];

  // Loop through each key, and will populate the dataOutput array
  for (let i = 0; i < keys.length; i++) {
    // if statement to the next loop for the next key when:
    // the value of that key equals to ""
    // the key is "chara"
    // If the value of the key is an empty array
    // if the key is "moveLink"
    if (moveObj[keys[i]] == "" || keys[i] == "chara" || (Array.isArray(moveObj[keys[i]]) && keys[i].length == 0) || keys[i] == "moveLink") {
      continue;
    } else {
      // if value of object is an array
      // join the array elements into a string and store it in tempObj.value
      if (Array.isArray(moveObj[keys[i]])) {
        tempObj.value = moveObj[keys[i]].join(", ");
      } else {
        // if it is not an array, it will likely be a string or a number
        // convert it to a string and store in tempObj.value
        tempObj.value = moveObj[keys[i]].toString();
      }
    }
    // tempObj.value is created, make tempObj.name and tempObj.inline.
    tempObj.name = keys[i];
    tempObj.inline = true;
    dataOutput.push(tempObj);
    tempObj = {}
  }

  // loop through the dataOutput array, and take out the images and put into imageOutput array
  for (let i = 0; i < dataOutput.length; i++) {
    if (dataOutput[i].name == 'images' || dataOutput[i].name == 'hitboxes' ) {
      imageOutput.push(...dataOutput.splice(i, 1))
      i--;
    }
  }

  // console.log(dataOutput)
  // console.log(imageOutput)


  // return dataOutput and imageOutput, both of which contains a list of objects that fits into the addFields method.
  return {dataOutput, imageOutput}
}

// Function is called in f.js
// moveList is a list of moves that got matched (multiple matches)
// This will create the inputs of the fields where the user has to select which move he wish to see the frame data of
const makeSelectableFields = (moveList) => {
  let tempObj = {};
  let output = [];

  // For each moveObj in moveList
  for (let i = 0; i < moveList.length; i++) {
    // If the moveObj has a name key, it will add the name to tempObj. If not, it will add the input
    if (moveList[i]['name']) {
      tempObj.name = `${i + 1}: ${moveList[i]['chara']}'s ${moveList[i]['name']}`;
    } else {
      tempObj.name = `${i + 1}: ${moveList[i]['chara']}'s ${moveList[i]['input']}`;
    }

    // Populating the tempObj.value and tempObj.inline
    tempObj.value = moveList[i]['input'];
    tempObj.inline = false;
    output.push(tempObj);
    tempObj = {};

  } 

  // Output a list of objects.
  return output;
}


module.exports = {makeFields, makeSelectableFields};
