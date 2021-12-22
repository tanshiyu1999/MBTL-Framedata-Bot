// Ping is the latency between client and discord

const Discord = require("discord.js");
const Command = require("../Structures/Command.js")
const {arcs, maids, rekka, rapid} = require("../Scripts/mbtlScripts/helpMessages.js");


module.exports = new Command({
  name: "help",
  description: "Shows you a help Message",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    const helpMsg = new Discord.MessageEmbed();

    helpMsg
      .setTitle("How to find framedata")
      .setDescription("!f (character name) (movename) \n Example: !f hisui 5a \n\nClick below if you are having trouble with certain finding")
      .setColor("GREEN")
    
    

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("maids")
        .setLabel("Hisui & Kohaku")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("arcs")
        .setLabel("Arc and Red Arc")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("rekka")
        .setLabel("Rekka")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("rapid")
        .setLabel("Rapid")
        .setStyle("PRIMARY")
    )

    let problemMsg = await message.channel.send({embeds: [helpMsg], components: [row]});

    const filter = (interaction) => {
      return interaction.user.id === message.author.id
    };

    let msgDeleted = false;
    const collectorA = problemMsg.createMessageComponentCollector({filter, time: 20000});
    collectorA.on("collect", async i => {
      switch(i.customId) {
        case "maids":
          msgDeleted = true;
          problemMsg.delete();          
          maids(message)
          break;
        case "arcs":
          msgDeleted = true;
          problemMsg.delete();
          arcs(message);
          break;
        case "rekka":
          msgDeleted = true;
          problemMsg.delete();          
          rekka(message)
          break;
        case "rapid":
          msgDeleted = true;
          problemMsg.delete();          
          rapid(message)
          break;
      }
    });

    collectorA.on("end", async () => {
      if (msgDeleted == false) {
        problemMsg.delete()
      }      
    })
    




  }
})