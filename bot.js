const config = require("./config.json");
const Discord = require("discord.js");
const prefix = config.bot.prefix;

const bot = new Discord.Client();

bot.on("ready", async () => {
  try {
    console.log(`logged in as ${bot.user.username}`);
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  }catch(e) {
    console.log(e.stack)
  }
});

bot.on("message", async message =>{
  if(message.author.bot) return 
  if(message.channel.type === "dm") return

  let messageArray = message.content.split(" ")
  let command = messageArray[0]
  let args = messageArray.slice(1)


  if(!command.startsWith(prefix)) return;

  if(command === `${prefix}hello`){
      console.log("Hello")
  }
 
});

bot.login(config.login.token);