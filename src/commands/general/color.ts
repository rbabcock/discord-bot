import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export default class extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      description: 'Change name color',
      group: 'general',
      memberName: 'color',
      name: 'color',
      args: [
        {
          key: 'hex',
          prompt: 'Hex Code',
          type: 'string',
        },
      ],
    });
  }

  async updateColor(msg: CommandoMessage, color: string) {
    const {
      author,
      author: { id },
      guild,
    } = msg;

    const sig = `c-${id}`;
    const role = guild.roles.cache.find(({ name }) => name == sig);

    if (role) {
      role.setColor(color);
    } else {
      // TODO: We should be determining position based off the position of BoyWonder's own role
      const role = await guild.roles.create({ data: {name: sig, position: 3 }});

      guild.member(author)?.roles.add(role)
    }
  }

  async run(msg: CommandoMessage, { hex }: { hex: string }) {
    if (!/#[\da-fA-F]{3,6}/.test(hex)) return msg.say('invalid hex code');

    await this.updateColor(msg, hex);

    return msg.say(`Name color changed to \`${hex}\``);
  }
}