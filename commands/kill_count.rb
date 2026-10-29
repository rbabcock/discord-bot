require_relative '../lib/hi_scores'
require_relative '../models/players'
require_relative '../lib/command_helper'

module Commands
  module KillCount
    def self.register(bot)
      CommandHelper.register(bot, :kill_count, 'Look up OSRS completion count for a player') do |cmd|
        cmd.string('player', "Player name (RSN)", required: false)
      end

      bot.application_command(:kill_count) do |event|
        name = event.options['player'].to_s.strip
        name = Players.name_for(event.user.id).to_s if name.empty?

        if name.empty?
          event.respond(content: "Give me a name, or link yours first with '/setname'.", ephemeral: true)
          next
        end

        unless name.match?(Hiscores::NAME_REGEX)
          event.respond(content: "That doesn't look like a valid OSRS name.", ephemeral: true)
          next
        end

        event.defer

        begin
          data = Hiscores.fetch(name)
          if data
            event.edit_response(content: Hiscores.kill_scores(name, data))
          else
            event.edit_response(content: "No KC or activity found for **#{name}**.")
          end
        rescue StandardError => e
          warn "Stats error: #{e.class}: #{e.message}"
          event.edit_response(content: "Couldn't reach the hiscores API right now. Try again in a bit")
        end
      end
    end
  end
end