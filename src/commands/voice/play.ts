import { VoiceConnection } from "discord.js";
import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import * as ytdl from "ytdl-core-discord";
import * as fs from "fs";

export default class VoicePlayCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "play",
      group: "voice",
      memberName: "play",
      description: "Makes the bot play a youtube video",
      examples: ["play"],
      aliases: ["p"],
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

  async playFromFiles(connection: VoiceConnection, url: string) {
    connection.play(fs.createReadStream(url));
  }

  async play(connection: VoiceConnection, url: string) {
    connection.play(await ytdl(url, { filter: "audioonly" }), { type: "opus" });
  }

  async run(message: CommandoMessage, { url }: { url: string }) {
    let voiceChannel = message.member?.voice.channel;
    let folderPath: string = "src/audioFiles";
    let pattern = new RegExp("^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$");
    let validate = pattern.test(url);

    if (!voiceChannel) {
      return message.say(
        "please join a voiceChannel before issuing this command"
      );
    }
    const connection = await voiceChannel.join();
    if (connection) {
      if (!validate) {
        try {
          await this.playFromFiles(connection, `${folderPath}/${url}`);
          return message.say(`Now playing: ${url}`);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          let info = await ytdl.getInfo(url);
          await this.play(connection, url);
          return message.say(`Now playing: ${info.videoDetails.title}`);
        } catch (err) {
          console.log(err);
        }
      }
      return message.say(`Now playing: ${url}`);
    } else {
      return message.say("Not connected to a voice channel");
    }
  }
}
