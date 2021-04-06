import { CommandoClient } from 'discord.js-commando';
import { join } from 'path';
import * as config from 'config';

const { token } = config.get('login');

const client = new CommandoClient({
  commandPrefix: '!',
  owner: config.get('admin'),
  disableMentions: 'everyone',
});

client.on('ready', () => console.log(`ready`));

client.registry
  .registerDefaults()
  .registerGroups([
    ['general', 'General Commands'],
    ['voice', 'Voice Commands'],
  ])
  .registerCommandsIn(join(__dirname, 'commands'));

client.login(token);
