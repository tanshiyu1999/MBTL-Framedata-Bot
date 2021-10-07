const Command = require("../Structures/Command.js")
const FindFrameData = require("./findFrameData.js")
const Discord = require("discord.js")
const {makeFields, makeSelectableFields} = require("./makeFields.js")


// This function is called from f.js
const outputDiscord = (moveList, message) => {
  const output = new Discord.MessageEmbed();

  // moveList should only have 1 object if outputDiscord method is called from Commands/f.js
  let moveObj = moveList[0];

  // makeFields will create the fields to be inputted into addFields
  const {dataOutput, imageOutput} = makeFields(moveObj);

  // Setting up the output for Discord, with the necessary data.
  output
    .setAuthor(
      moveObj['chara'],
      message.author.avatarURL({dynamic: true})
    )
    .setTitle(`Frame data for ${((moveObj.name) ? moveObj.name : moveObj.input)}`)
    .setURL(moveObj.moveLink)
    // .setThumbnail(imageOutput[1].value)
    .setColor("BLURPLE")
    .addFields(...dataOutput)
    .setFooter("Data provided by Mizuumi wiki", "https://wiki.gbl.gg/mizulogo.png?1fe5d")
  // console.log(imageOutput)


  // This will check if there is a Hitbox image in the imageOutput  returned from makeFields function
  // If yes, printHitbox becomes positive
  let printHitbox = false;
  imageOutput.forEach(imageObj => {
    if (imageObj.name == "hitboxes") {
      if (imageObj.value != "") {
        printHitbox = true;
      }
    }
  })

  // If printHitbox is true, it will print the hitbox, if not, it will print the no hitbox image.
  if (printHitbox) {
    for (let i = 0; i < imageOutput.length; i++) {
      if (imageOutput[i].name == "hitboxes") {
        // console.log(imageOutput[i].value)
        output.setThumbnail(imageOutput[i].value)
      }
    }
  } else {
    for (let i = 0; i < imageOutput.length; i++) {
      if (imageOutput[i].name == "images") {
        output.setThumbnail(imageOutput[i].value)
      }
    }
  }

  // This sends the message into the Discord channel itself.
  message.channel.send({embeds:[output]});
  
}

module.exports = outputDiscord;

// This generates the discord bot output if only 1 moveObj is returned.

