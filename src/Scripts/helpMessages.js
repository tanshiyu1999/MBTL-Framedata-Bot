const Discord = require("discord.js")

const arcs = (message) => {
  const helpMsg = new Discord.MessageEmbed();
  
  helpMsg
    .setTitle("Parsing Arc from Red Arc")
    .setDescription("General Parsing already supported. \nShorthand parsing is also developed \nPlease see example below.")
    .setColor("GREEN")
    .addFields({
      name: "Calling for Arc",
      value: "`!f warc 5A`, `!f arc 5A`", 
      inline: false
    }, {
      name: "Calling for Red Arc",
      value: "`!f rarc 5A`, `!f red arc 5A`",
      inline: false
    })
  message.channel.send({embeds: [helpMsg]})
}

const maids = (message) => {
  const helpMsg = new Discord.MessageEmbed();
  
  helpMsg
    .setTitle("Parsing Hisui & Kohaku")
    .setDescription("General Parsing already supported.\nMove parser require inputs of H and K in front\nPlease see example below.")
    .setColor("GREEN")
    .addFields({
      name: "Calling for Hisui & Kohaku",
      value: "`!f hk 22D`, `!f maids 22D`, `!f h&k 22D`, `!f hisui & kohaku 22D`", 
      inline: false
    }, {
      name: "Calling for Hisui's moves - Add H in front of move",
      value: "`!f maids H5a`, `!f maids h236A`",
      inline: false
    }, {
      name: "Calling for Kohaku's moves - Add K in front of move",
      value: "`!f maids k5a`, `!f maids K236A`",
      inline: false
    }, {
      name: "If both Kohaku & Hisui can use that move, need not add anything",
      value: "`!f maids 22D`",
      inline: false
    })
  message.channel.send({embeds: [helpMsg]})
}


const rekka = (message) => {
  const helpMsg = new Discord.MessageEmbed();
  
  helpMsg
    .setTitle("Parsing rekka moves")
    .setDescription("X means A, B or C \nPlease see example below.")
    .setColor("GREEN")
    .addFields({
      name: "Calling for Ciel's 214B/C~X~B Rekka",
      value: "`!f ciel 214bab`, `!f ciel 214cbb`", 
      inline: false
    }, {
      name: "Calling for Michael Roa Valdamjong's 214A~X rekka",
      value: "`!f roa 214aa`, `!f roa 214ab`, `!f roa 214ac`",
      inline: false
    })
  message.channel.send({embeds: [helpMsg]})
}

const rapid = (message) => {
  const helpMsg = new Discord.MessageEmbed();
  
  helpMsg
    .setTitle("Parsing rapid moves")
    .setDescription("Rapid is the auto-combo used \nPlease see example below.")
    .setColor("GREEN")
    .addFields({
      name: "Calling for Ciel's Rapids",
      value: "`!f ciel rapid 2`, `!f ciel rapid3`", 
      inline: false
    }, {
      name: "Calling for Shiki's Rapids",
      value: "`!f shiki Rapid2`, `!f shiki rapid 3`",
      inline: false
    })
  message.channel.send({embeds: [helpMsg]})
}


module.exports = {arcs, maids, rekka, rapid};