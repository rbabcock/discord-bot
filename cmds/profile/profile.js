
const { RichEmbed } = require('discord.js')
const { Command } = require('discord.js-commando');

module.exports = class ProfileCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'profile',
            group: 'profile',
            memberName: 'profile',
            description: 'Display user profile information',
            examples: ['profile']
        });
    }

    async run(message) {
       const embed = new RichEmbed()
        .setAuthor(`${message.author.username} profile information`)
        .addField('Username', `${message.author.username}`);
        message.embed(embed)
    }
};