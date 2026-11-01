require 'discordrb'
require 'dotenv/load'

$stdout.sync = true

bot = Discordrb::Bot.new(token: ENV.fetch('BOT_TOKEN'), intents: [:servers])

Dir[File.join(__dir__, 'commands', '*.rb')].sort.each { |file| require file }


Commands.constants.each do |name|
  mod = Commands.const_get(name)
  mod.register(bot) if mod.respond_to?(:register)
  puts "Loaded command module: #{name}"
end


puts "Bot is running. Press Ctrl+C to stop"
bot.run