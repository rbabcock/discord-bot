import { MessageEmbed } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import axios from "axios";
const { api_keys } = require("../../config/config.json");

export default class lastFMCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      description: "get current listened to track for user",
      group: "general",
      memberName: "lastfm",
      name: "lastfm",
      aliases: ["l", "lfm"],
    });
  }
  async run(message: CommandoMessage) {
    const user = message.member?.displayName;
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${api_keys.lastFm}&limit=1&nowplaying=true&format=json`;
    const request = await axios
      .get(url)
      .then((response) => {
        const track = response.data.recenttracks.track[0];
        console.log(track);
        const embed = new MessageEmbed()
          .setAuthor("Now Playing")
          .setColor("#0099ff")
          .setTitle(`${track.name}`)
          .setURL(`${track.url}`)
          .setThumbnail(`${track.image[2]["#text"]}`)
          .addFields([
            { name: "Artist", value: `${track.artist["#text"]}` },
            { name: "Album", value: `${track.album["#text"]}` },
          ]);
        return embed;
      })
      .catch((err) => {
        console.log(err);
      });
    return message.say(request);
  }
}
