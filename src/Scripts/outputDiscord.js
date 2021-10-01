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
    // .setURL("")
    // .setThumbnail(imageOutput[1].value)
    .setColor("BLURPLE")
    .addFields(...dataOutput)
    .setFooter("Data provided by Mizuumi wiki", "https://wiki.gbl.gg/mizulogo.png?1fe5d")
    //https://www.mediawiki.org/wiki/API:Imageinfo#API_documentation

  message.channel.send({embeds:[output]});
}

module.exports = outputDiscord;