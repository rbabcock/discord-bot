import { CommandoMessage, Command, CommandoClient } from "discord.js-commando";

export default class VoiceLeaveCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "leave",
      group: "voice",
      memberName: "leave",
      description: "Makes the bot leave a voice channel",
      examples: ["leave"],
    });
  }

  async run(message: CommandoMessage) {
    const client = this.client;
    let voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
      return message.say("I am not in any voice channel");
    } else {
      voiceChannel.leave();
      return message.say(
        `${client.user?.username} has left channel ${voiceChannel.name}`
      );
    }
  }
}
