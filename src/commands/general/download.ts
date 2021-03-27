import { CommandoClient, Command, CommandoMessage } from "discord.js-commando";
import * as ytdl from "ytdl-core-discord";
import * as ytdlCore from "ytdl-core";
import * as fs from 'fs';

export default class downloadCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "download",
      group: "general",
      memberName: "download",
      description: "downloads a youtube video",
      examples: ["download"],
      aliases: ['d'],
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

  async run(message: CommandoMessage, { url }: { url: string }) {
    let validate = await ytdl.validateURL(url);
    let info = await ytdlCore.getInfo(url);
    if (!validate) {
      return message.say("please use a valid URL");
    }

      ytdlCore(url).pipe(fs.createWriteStream(`src/audioFiles/${info.videoDetails.title}.mp4`))
      return message.channel.send(`Downloading: ${info.videoDetails.title}`);
  }
};
