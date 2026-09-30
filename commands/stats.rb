require_relative '../lib/hiscores'

module Commands
  module Stats
    def self.register(bot)
      bot.register_application_command(:stats, 'Look up OSRS hiscores for a player',
                                       server_id: ENV['DISCORD_SERVER_ID']) do |cmd|
        cmd.string('player', 'Player name (RSN)', required: true)
      end

      bot.application_command(:stats) do |event|
        name = event.options['player'].to_s.strip

        unless name.match?(Hiscores::NAME_REGEX)
          event.respond(content: "That doesn't look like a valid OSRS name.", ephemeral: true)
          next
        end

        event.defer

        begin
          data = Hiscores.fetch(name)
          if data
            event.edit_response(content: Hiscores.format_stats(name, data))
          else
            event.edit_response(content: "No hiscores entry found for **#{name}**.")
          end
        rescue StandardError => e
          warn "stats error: #{e.class}: #{e.message}"
          event.edit_response(content: "Couldn't reach the hiscores right now. Try again in a bit.")
        end
      end
    end
  end
end