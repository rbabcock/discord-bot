const { Command } = require('discord.js-commando');

module.exports = class VoiceJoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'voice',
            memberName: 'leave',
            description: 'Makes the bot leave a voice channel',
            examples: ['leave']

        });
    }

    async run(message) {
     const bot = this.client

     message.member.voiceChannel.leave();
     console.log(`${bot.user.username} has left channel ${message.member.voiceChannel.name}`)
    }
};
