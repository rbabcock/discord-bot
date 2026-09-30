module Commands
  module Ping
    def self.register(bot)
      bot.register_application_command(:ping, 'Check that the bot is alive', server_id: ENV.fetch("DISCORD_SERVER_ID", nil))
      bot.application_command(:ping) do |event|
        event.respond(content: "Pong!")
      end
    end
  end  
end