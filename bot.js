const { prefix, token, admin } = require("./config.json");
const { CommandoClient } = require("discord.js-commando");
const fs = require("fs");
const path = require('path')


const bot = new CommandoClient({
    commandPrefix: '!',
    owner: [admin[0]],
    disableEveryone: true
});

bot
    .on("ready", async () => {
        try {
          console.log(`logged in as ${bot.user.username}`)
          let link = await bot.generateInvite(["ADMINISTRATOR"])
        }catch(e) {
          console.log(e.stack)
        }
      });

bot.registry
  .registerDefaultTypes()
  .registerGroups([
    ['profile', 'Profile Command'],
    ['voice', 'Voice Command']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'cmds'));



bot.login(token)