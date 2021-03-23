import { MessageEmbed } from "discord.js";
import { CommandoClient, CommandoMessage, Command } from "discord.js-commando";

export default class ProfileCommand extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'profile',
            group: 'general',
            memberName: 'profile',
            description: 'Display user profile information'
        });
    }

    async run(message: CommandoMessage) {
        const embed = new MessageEmbed()
         .setAuthor(`${message.author.username} profile information`)
         .addField('Username', `${message.author.username}`);
        return message.embed(embed)
     }
 };