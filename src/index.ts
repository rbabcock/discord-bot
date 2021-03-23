
import {CommandoClient } from "discord.js-commando";
import { join } from 'path'

const { login, admin } = require("./config/config.json");

const client = new CommandoClient({
    commandPrefix: "!",
    owner: admin[0],
    disableMentions: "everyone"
});

client.on("ready",  () => console.log(`ready`));
     
client.registry
	.registerDefaults()
	.registerGroups([
        ['general', 'General Commands'],
        ['voice', 'Voice Commands']
    ])
	.registerCommandsIn(join(__dirname, 'commands'));

client.login(login.token)