const { prefix, token, admin } = require("./config.json");
const Discord = require("discord.js")
const fs = require("fs")

const bot = new Discord.Client()
bot.commands = new Discord.Collection()

fs.readdir("./cmds/", (err, commands) => {
  if(err) console.error(err);

  let jsfiles = commands.filter(file => file.split(".").pop() === "js")
  if(jsfiles.length <= 0) {
    console.log("No commands to load!")
    return
  }

  console.log(`Loading ${jsfiles.length} commands!`)

  jsfiles.forEach((f, i) => {
    let commands = require(`./cmds/${f}`)
    console.log(`${i + 1}: ${f} loaded!`)
    bot.commands.set(commands.help.name, commands)
  });
});

bot.on("ready", async () => {
  try {
    console.log(`logged in as ${bot.user.username}`)
    let link = await bot.generateInvite(["ADMINISTRATOR"])
  }catch(e) {
    console.log(e.stack)
  }
});

bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return

  let messageArray = message.content.split(/ +/);
  let command = messageArray[0];
  let args = messageArray.slice(1);


  if(!command.startsWith(prefix)) return

  let cmd = bot.commands.get(command.slice(prefix.length))
  if(cmd) cmd.run(bot, message, args)
 
});

bot.on('guildMemberAdd', async member => {
  let channel = member.guild.channel.find('name', 'admin')
  if(!channel) return 
    channel.send(`${member} has joined the server`)
})

bot.on('guildMemberRemove', async member => {
  let channel = member.guild.channel.find('name', 'admin')
  if(!channel) return
    channel.send(`${member} has left the server`)
})

bot.login(token)