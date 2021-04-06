import { CommandoMessage, Command, CommandoClient } from "discord.js-commando";
import * as fs from 'fs'

export default class VoiceRecordCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "record",
      group: "voice",
      memberName: "record",
      description: "record audio in voice channel",
      aliases: ['r'],
      examples: ["record"],
    });
  }

   createFilePath() {
    const pathToFile = `src/recordings/${Date.now()}.mp3`
    return fs.createWriteStream(pathToFile);
  }

  async run(message: CommandoMessage) {
    let voiceChannel = message.member?.voice.channel  
    let user = message.member
    const connection = await voiceChannel?.join();
    if(connection) {
      const audio = connection.receiver.createStream(user!, { mode: 'pcm'})
      console.log("RECORDING!");
      audio.pipe(this.createFilePath())
      audio.on('end', () => {console.log(`${user?.displayName} stopped speaking`)})
      voiceChannel?.leave()
    }
    return message.say('recording done');
  }
}