// Input is a single object
const makeFields = (moveObj) => {
  // generate a list of objects, if the value of object == "", convert to " ".
  let keys = Object.keys(moveObj);

  let tempObj = {};
  let dataOutput = [];
  let imageOutput = [];

  for (let i = 0; i < keys.length; i++) {
    if (moveObj[keys[i]] == "" || keys[i] == "chara" || (Array.isArray(moveObj[keys[i]]) && keys[i].length == 0) || keys[i] == "moveLink") {
      continue;
    } else {
      if (Array.isArray(moveObj[keys[i]])) {
        tempObj.value = moveObj[keys[i]].join(", ");
      } else {
        tempObj.value = moveObj[keys[i]].toString();
      }
    }
    tempObj.name = keys[i];
    tempObj.inline = true;
    dataOutput.push(tempObj);
    tempObj = {}
  }

  
  for (let i = 0; i < dataOutput.length; i++) {
    if (dataOutput[i].name == 'images' || dataOutput[i].name == 'hitboxes' ) {
      imageOutput.push(...dataOutput.splice(i, 1))
      i--;
    }
  }

  // console.log(dataOutput)
  // console.log(imageOutput)

  return {dataOutput, imageOutput}
}

const makeSelectableFields = (moveList) => {
  let tempObj = {};
  let output = [];

  for (let i = 0; i < moveList.length; i++) {
    if (moveList[i]['name']) {
      tempObj.name = `${i + 1}: ${moveList[i]['chara']}'s ${moveList[i]['name']}`;
    } else {
      tempObj.name = `${i + 1}: ${moveList[i]['chara']}'s ${moveList[i]['input']}`;
    }
    tempObj.value = moveList[i]['input'];
    tempObj.inline = false;
    output.push(tempObj);
    tempObj = {};

  } 
  return output;
}


module.exports = {makeFields, makeSelectableFields};
