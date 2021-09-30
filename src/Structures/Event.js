const Discord = require("discord.js");

const Client = require("./Client.js");

function RunFunction(client, ...eventArgs) {

}

class Event {
  constructor(event, runfunction) {
    this.event = event;
    this.run = runfunction;
  }
}

module.exports = Event;