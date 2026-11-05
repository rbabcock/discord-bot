# frozen_string_literal: true

require_relative '../lib/command_helper'
module Commands
  module General
    module Ping
      def self.register(bot)
        CommandHelper.register(bot, :ping, 'Check that the bot is alive')
        bot.application_command(:ping) do |event|
          event.respond(content: 'Pong!')
        end
      end
    end
  end
end
