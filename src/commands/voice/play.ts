import { VoiceConnection } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import * as ytdl from "ytdl-core-discord";
import * as ytdlCore from "ytdl-core";

export default class VoicePlayCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "play",
      group: "voice",
      memberName: "play",
      description: "Makes the bot play a youtube video",
      examples: ["play"],
      aliases: ['p'],
      args: [
        {
          key: "url",
          prompt: "Please specify a url for the bot to play",
          type: "string",
          default: "",
        },
      ],
    });
  }

  async play(connection: VoiceConnection, url: string) {
    connection.play(await ytdl(url), { type: "opus" });
  }

  async run(message: CommandoMessage, { url }: { url: string }) {
    const client = this.client;
    let voiceChannel = message.member?.voice.channel;
    let validate = await ytdl.validateURL(url);
    let info = await ytdlCore.getInfo(url);
    console.log(info.videoDetails.title);

    if (!voiceChannel) {
      return message.say(
        "please join a voiceChannel before issuing this command"
      );
    }
    if (!validate) {
      return message.say("please use a valid URL");
    }

    const connection = await voiceChannel.join();
    if (connection) {
      console.log(
        `${client.user?.username} have successfully connected to voice channel ${voiceChannel?.name}`
      );
      try {
        await this.play(connection, url);
      } catch (err) {
        console.log(err);
      }
      return message.say(`Now playing: ${info.videoDetails.title}`);
    } else {
      return message.say("Not connected to a voice channel");
    }
  }
};
