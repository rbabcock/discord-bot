const { Command } = require('discord.js-commando');

module.exports = class VoiceJoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'voice',
            memberName: 'join',
            description: 'Makes the bot join a voice channel',
            examples: ['join'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Please specify a voice channel for the bot to join',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(message, { channel }) {
      const bot = this.client
      
      if(message.member.voiceChannel)
        message.member.voiceChannel.join()
        .then(connection => {
            console.log(`${bot.user.username} have successfully connected to voice channel ${message.member.voiceChannel.name}`);
        })
        .catch(console.log);
    }
};