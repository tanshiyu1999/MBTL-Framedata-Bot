const Command = require("../Structures/Command.js");
const searchData = require("../Scripts/findFrameData.js")
const Discord = require("discord.js");
const outputDiscord = require("../Scripts/outputDiscord.js")

module.exports = new Command({
  name: "f",
  description: "Shows an embed",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let moveList = await searchData(args[0], args[1])

    if (moveList.length == 1) {
      outputDiscord(moveList, message)
    }
    

    


    
  }
});