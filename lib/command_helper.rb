# frozen_string_literal: true

module CommandHelper
  SERVER_IDS = ENV.fetch('DISCORD_SERVER_IDS', '').split(',').map(&:strip).reject(&:empty?)

  def self.register(bot, name, discription, &block)
    if SERVER_IDS.empty?
      bot.register_application_command(name, discription, &block)
    else
      SERVER_IDS.each do |id|
        bot.register_application_command(name, discription, server_id: id, &block)
      end
    end
  end
end
