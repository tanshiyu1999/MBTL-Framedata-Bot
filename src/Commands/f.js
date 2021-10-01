const Command = require("../Structures/Command.js");
const searchData = require("../Scripts/findFrameData.js")
const Discord = require("discord.js");
const outputDiscord = require("../Scripts/outputDiscord.js")
const {makeFields, makeSelectableFields} = require("../Scripts/makeFields.js")
const emoji = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣","8️⃣", "9️⃣", "🔟"];


module.exports = new Command({
  name: "f",
  description: "Shows an embed",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let moveList = await searchData(args[0], args[1]);

    if (moveList.length == 1) {
      outputDiscord(moveList, message)
    } else if (moveList.length > 1) {
      const confirmMove = new Discord.MessageEmbed();
      const inputSelectableFields = makeSelectableFields(moveList);

      confirmMove
        .setTitle(`Multiple results found!`)
        .setDescription("Please select one of the following: ")
        .setColor("BLUE")
        .addFields(...inputSelectableFields);
      let confirmedMessage = await message.channel.send({embeds:[confirmMove]})

      // Create the numbering based on the number of confirmed Moves
      for (let i = 0; i < moveList.length; i++) {
        await confirmedMessage.react(emoji[i+1]);
      };

      let notDeleted = true;
      const filter = (reaction, user) => {
        return user.id === message.author.id;
      }
      const collector = confirmedMessage.createReactionCollector({filter: filter, time: 10000});
      collector.on('collect', (reaction, user) => {
        switch(reaction.emoji.name) {
          case "1️⃣":
            notDeleted = false;
            outputDiscord([moveList[0]], message)
            confirmedMessage.delete();
            break;
          case "2️⃣":
            notDeleted = false;
            outputDiscord([moveList[1]], message)
            confirmedMessage.delete();
            break;
          case "3️⃣":
            notDeleted = false;
            outputDiscord([moveList[2]], message)
            confirmedMessage.delete();
            break;
          case "4️⃣":
            notDeleted = false;
            outputDiscord([moveList[3]], message)
            confirmedMessage.delete();
            break;
          case "5️⃣":
            notDeleted = false;
            outputDiscord([moveList[4]], message)
            confirmedMessage.delete();
            break;
          case "6️⃣":
            notDeleted = false;
            outputDiscord([moveList[5]], message)
            confirmedMessage.delete();
            break;
          case "7️⃣":
            notDeleted = false;
            outputDiscord([moveList[6]], message)
            confirmedMessage.delete();
            break;
          case "8️⃣":
            notDeleted = false;
            outputDiscord([moveList[7]], message)
            confirmedMessage.delete();
            break;
          case "9️⃣":
            notDeleted = false;
            outputDiscord([moveList[8]], message)
            confirmedMessage.delete();
            break;
          case "🔟":
            notDeleted = false;
            outputDiscord([moveList[9]], message)
            confirmedMessage.delete();
            break;
        }
      });
      collector.on('end', (reaction,user) => {
        if (notDeleted) {
          confirmedMessage.delete();
        }
      })
    } else if (!moveList) {
      const output = new Discord.MessageEmbed();
      output
        .setTitle(`${message.content} cannot be found`)
        .setDescription('Please ensure that you have entered the command correctly \n !f (Name) (Move)')
        .setColor("RED")
      message.channel.send({
        embeds:[output],
      });
    }
  }
});