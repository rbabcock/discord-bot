import { CommandoClient, CommandoMessage, Command } from "discord.js-commando";
import * as fs from 'fs';

export default class ListCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "list",
      group: "general",
      memberName: "list",
      description: "list downloaded music",
    });
  }

  async run(message: CommandoMessage) {
    const filesArr = []
    const path = 'src/audioFiles';
    const files = fs.readdirSync(path);
    for(const file of files) {
      filesArr.push(file)
    }
    return message.code(`${filesArr}`)
  }
}
