const { Command } = require('discord.js-commando');

module.exports = class VoiceJoinCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'leave',
            group: 'voice',
            memberName: 'leave',
            description: 'Makes the bot leave a voice channel',
            examples: ['leave']
        });
    }

    async run(message) {
     message.member.voiceChannel.leave();
     console.log(`Bot has left channel ${message.member.voiceChannel.name}`)
    }
};