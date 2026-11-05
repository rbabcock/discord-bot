# frozen_string_literal: true

require 'active_record'
require 'yaml'
require 'irb'
require_relative 'models/users'

config = YAML.load_file('config/database.yml', aliases: true)
ActiveRecord::Base.establish_connection(config.fetch('development'))
ActiveRecord::Base.logger = Logger.new($stdout)

IRB.start
