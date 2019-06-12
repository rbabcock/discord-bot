const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');

module.exports = class VoiceJoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'voice',
            memberName: 'play',
            description: 'Makes the bot play a youtube video',
            examples: ['play'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Please specify a voice channel for the bot to join',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    async run(msg, { channel }) {
      const bot = this.client
      let voiceChannel = msg.member.voiceChannel;
      let url = msg.content.replace('!play', '');
      let validate = ytdl.validateURL(url);
      let info = ytdl.getInfo(url).then(resolve => {resolve(result)}).catch(console.log('error getting info'));
      console.log(info);

      
      if(!voiceChannel) {
        return msg.say('please join a voiceChannel before issuing this command')
      }
      if(!validate) {
        return msg.say('please use a valid URL')
      }

      msg.member.voiceChannel.join()
        .then(connection => {
            console.log(`${bot.user.username} have successfully connected to voice channel ${msg.member.voiceChannel.name}`);          
            let dispatcher = connection.playStream(ytdl(url, {filter: 'audioonly'}));
            dispatcher.on('end', () => {
                dispatcher.end()
            })
            msg.channel.send(`Now playing: ${info}`);
        })
        .catch(console.log);
    }
};