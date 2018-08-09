const { Command } = require('discord.js-commando');

module.exports = class VoiceJoinCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'join',
            group: 'voice',
            memberName: 'join',
            description: 'Makes the bot join a voice channel',
            examples: ['join']
        });
    }

    async run(message) {
      const bot = this.bot
      if(message.member.voiceChannel)
        message.member.voiceChannel.join()
        .then(connection => {
            console.log(`${bot} have successfully connected to voice channel ${message.member.voiceChannel.name}`);
        })
        .catch(console.log);
    }
};