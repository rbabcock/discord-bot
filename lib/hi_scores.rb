# frozen_string_literal: true

require 'net/http'
require 'json'
require 'uri'

module Hiscores
  URL = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.json'
  NAME_REGEX = /\A[a-zA-Z0-9 _-]{1,12}\z/.freeze
  BOSS_START = 'Abyssal Sire'
  CLUE_START = 'Clue Scrolls'
  MESSAGE_LIMIT = 2000

  def self.fetch(name)
    uri = URI.parse(URL)
    uri.query = URI.encode_www_form(player: name)

    req = Net::HTTP::Get.new(uri)

    res = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 5, read_timeout: 5) { |http| http.request(req) }

    case res
    when Net::HTTPSuccess then JSON.parse(res.body)
    when Net::HTTPNotFound then nil
    else raise "Hiscores return HTTP #{res.code}"
    end
  end

  def self.commas(num)
    num.to_i.to_s.reverse.scan(/\d{1,3}/).join(',').reverse
  end

  def self.format_stats(name, data)
    skills = data['skills']
    overall = skills.find { |s| s['name'] == 'Overall' }
    lines = skills.reject { |s| s['name'] == 'Overall' }.map do |s|
      format('%-13s %3d %s', s['name'], s['level'], commas([s['xp'].to_i, 0].max))
    end

    "**#{name}** | Total level: #{overall['level']} | Total XP: #{commas(overall['xp'])}\n" \
    "```\n#{lines.join("\n")}\n```"
  end

  def self.group_activities(data)
    activities = data['activities']
    boss_index = activities.index { |a| a['name'] == BOSS_START } || activities.size
    misc = activities[0...boss_index]
    boss = activities[boss_index..]
    clues, misc = misc.partition { |a| a['name'].start_with?(CLUE_START) }

    { misc: misc, clues: clues, bosses: boss }
  end

  def self.kill_scores(_name, data)
    groups = group_activities(data).transform_values { |list| list.select { |a| a['score'].to_i.positive? } }

    { bosses: 'Bosses', clues: 'Clue Scrolls', misc: 'Minigames' }.filter_map do |key, title|
      next if groups[key].empty?

      lines = groups[key].map { |a| format('%-34s %s', a['name'], commas(a['score'])) }
      "#{title}\n#{lines.join("\n")}"
    end
  end
end
