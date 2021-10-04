const Command = require("../Structures/Command.js")
const FindFrameData = require("./findFrameData.js")
const Discord = require("discord.js")
const {makeFields, makeSelectableFields} = require("./makeFields.js")

const outputDiscord = (moveList, message) => {
  const output = new Discord.MessageEmbed();

  let moveObj = moveList[0];

  const {dataOutput, imageOutput} = makeFields(moveObj);
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

  let printHitbox = false;
  imageOutput.forEach(imageObj => {
    if (imageObj.name == "hitboxes") {
      if (imageObj.value != "") {
        printHitbox = true;
      }
    }
  })

  if (printHitbox) {
    for (let i = 0; i < imageOutput.length; i++) {
      if (imageOutput[i].name == "hitboxes") {
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







  message.channel.send({embeds:[output]});
  
}

module.exports = outputDiscord;
