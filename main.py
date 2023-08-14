import discord

class MyClient(discord.Client):
    async def on_ready(self):
      print('Logged on as', self.user)

    async def on_message(self, message):
      if message.author == self.user:
        return
      if message.content == 'ping':
          await message.channel.send('pong')


intents = discord.Intents.default()
intents.message_content = True
client = MyClient(intents=intents)
client.run('NDUzMjI3MjYwODIwOTc5NzE0.GGOle7.9YSJdN_8AQso1ws_RuK-_aRBiPCgd70jyKZEZM')
