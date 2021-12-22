const fetchData = require("../Scripts/mbtlScripts/fetchData.js");
const Discord = require("discord.js");

const Command = require("../Structures/Command.js")

module.exports = new Command({
  name: "updateMbtl",
  description: "Update the local database",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {

    const loading = new Discord.MessageEmbed();

    loading
      .setTitle("Fetching Data from Mizuumi")
      .setURL("https://wiki.gbl.gg/w/Main_Page")
      .setColor("YELLOW")

    const loadingMsg = await message.channel.send({embeds: [loading]})

    await fetchData();

    loadingMsg.delete();
  
    const loaded = new Discord.MessageEmbed();
    loaded
      .setTitle("New Frame Data has been fetched")
      .setDescription("Data is fetched from [Mizuumi](https://wiki.gbl.gg/w/Main_Page).")
      .setColor("GREEN")

    message.channel.send({embeds: [loaded]})
  }
})