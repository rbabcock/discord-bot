require_relative '../lib/hiscores'
require_relative '../models/players'
require_relative '../lib/command_helper'

module Commands
  module SetName
      def self.register(bot)
        CommandHelper.register(bot, :setname, 'Set OSRS name that will be tied to your discord_id') do |cmd|
          cmd.string('name', "OSRS Username", required: true )
        end
        
        bot.application_command(:setname) do |event|
          name = event.options['name'].to_s.strip

          unless name.match?(Hiscores::NAME_REGEX)
            event.respond(content: "That doesn't look like a valid OSRS Username", ephemeral: true)
            next
          end

          Players.link(event.user.id, name)
          event.respond(content: "Saved! your OSRS Username is set to **#{name}**." \
          "You can run '/stats' with no name to look yourself up", ephemeral: true
          )
        end
      end
  end
end