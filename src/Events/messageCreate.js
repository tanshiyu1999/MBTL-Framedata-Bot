const Event = require("../Structures/Event.js");
const inputParser = require("../Scripts/inputParser.js")

module.exports = new Event("messageCreate", (client, message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(client.prefix)) return;

  // remove [ and ]
  // message.content = message.content.replace("[", "").replace("]", "")

  const args = message.content.substring(client.prefix.length).split(/ +/);

  if (args.length == 1 && args[0] == 'f') {
    console.log("Only f command is included")
    return;
  }


  // return the command if it is equal to the first argument
  const command = client.commands.find(cmd => {
    if(cmd.name == args[0]) {
      args.shift()
      return cmd;
    };
  })

  if (!command){
    console.log(command);
    return; //message.reply(`${args[0]} is not a valid command!`)
  }


  

  command.run(message, args, client);

})