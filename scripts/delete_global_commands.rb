# frozen_string_literal: true

require 'discordrb'
require 'dotenv/load'

bot = Discordrb::Bot.new(token: ENV.fetch('BOT_TOKEN'))

commands = bot.get_application_commands # no server_id: global commands only

if commands.empty?
  puts 'No global commands.'
else
  commands.each do |cmd|
    puts "Deleting /#{cmd.name} (#{cmd.id})"
    bot.delete_application_command(cmd.id)
  end
end
