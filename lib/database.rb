# frozen_string_literal: true

require 'active_record'
require 'yaml'

module Database
  def self.connect!
    config = YAML.load_file('config/database.yml', aliases: true)
    ActiveRecord::Base.establish_connection(config['development'])
  end
end

Database.connect!
