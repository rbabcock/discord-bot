import { VoiceChannel } from "discord.js";
import { CommandoMessage, Command, CommandoClient } from "discord.js-commando";

export default class VoiceStopCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "stop",
      group: "voice",
      memberName: "stop",
      description: "stop a music",
      examples: ["stop"],
    });
  }

  async stop(voiceChannel: VoiceChannel) {
    (await voiceChannel.join()).dispatcher.end()
  }

  async is_connected() {
    const client = this.client
    const connection = client.voice?.connections
    if(connection) {
      return true
    } else {
      return false
    }
  }

  async run(message: CommandoMessage) {
    let voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
      return message.say("I am not in any voice channel");
    } else {
      if(this.is_connected()) {
        this.stop(voiceChannel)
      }
      return message.say('music stopped');
    }
  }
}
