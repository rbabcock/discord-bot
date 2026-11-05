# frozen_string_literal: true

require_relative '../lib/hi_scores'
require_relative '../models/players'
require_relative '../lib/command_helper'

module Commands
  module Osrs
    module Stats
      def self.register(bot)
        CommandHelper.register(bot, :stats, 'Look up OSRS stats for a player') do |cmd|
          cmd.string('player', 'Player name (RSN)', required: false)
        end

        bot.application_command(:stats) do |event|
          linked = Players.name_for(event.user.id).to_s
          name = event.options['player'].to_s.strip
          name = linked if name.empty?

          if name.empty?
            event.respond(content: 'Give me a name, or link yours first with `/setname`.', ephemeral: true)
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
              event.edit_response do |builder|
                builder.add_embed do |embed|
                  embed.title = "#{name}: Total Stats"
                  embed.color = 0xC8AA6E
                  if linked.casecmp?(name)
                    embed.author = { name: event.user.display_name,
                                    icon_url: event.user.avatar_url }
                  end
                  embed.footer = { text: 'Data from OSRS highscores' }
                  embed.description = Hiscores.format_stats(name, data)
                end
              end
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
end
