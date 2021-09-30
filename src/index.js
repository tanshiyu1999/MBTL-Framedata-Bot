console.clear();

const keepAlive = require('./Hosting/server.js')

const config = require("./Data/config.json");

const Client = require("./Structures/Client.js");

const client = new Client();

keepAlive();
client.start(config.token);