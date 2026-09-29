require 'discordrb'
require 'dotenv/load'

bot = Discordrb::Bot.new token: ENV['BOT_TOKEN']

bot.run