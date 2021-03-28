import { CommandoMessage, Command, CommandoClient } from "discord.js-commando";

export default class VoiceJoinCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "join",
      group: "voice",
      memberName: "join",
      description: "Makes the bot join a voice channel",
      examples: ["join"],
      args: [
        {
          key: "channel",
          prompt: "Please specify a voice channel for the bot to join",
          type: "string",
          default: "",
        },
      ],
    });
  }

  async run(message: CommandoMessage) {
    const client = this.client;
    let voiceChannel = message.member?.voice.channel;

    if (!voiceChannel) {
      return message.say(
        "please join a voiceChannel before issuing this command"
      );
    }

    voiceChannel.join().then(() => {
        console.log(
          `${client.user?.username} have successfully connected to voice channel ${voiceChannel?.name}`
        );
      })
      .catch(console.log);
    return message.say(`Joined ${voiceChannel.name}`);
  }
}
