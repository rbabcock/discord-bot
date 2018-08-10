const { Command } = require('discord.js-commando');

module.exports = class VoiceLeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'voice',
            memberName: 'leave',
            description: 'Makes the bot leave a voice channel',
            examples: ['leave']

        });
    }

    async run(msg) {
     const bot = this.client
     let voiceChannel = msg.member.voiceChannel
     if (!voiceChannel) {
        msg.say('I am not in any voice channel');
     } else {
        msg.member.voiceChannel.leave();
        console.log(`${bot.user.username} has left channel ${msg.member.voiceChannel.name}`)
     } 
    }
};
