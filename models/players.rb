require_relative '../lib/hiscores'
require_relative '../lib/database'

class Players < ActiveRecord::Base
  validates :discord_id, presence:true, uniqueness: true
  validates :osrs_name, format: { with: Hiscores::NAME_REGEX}


  def self.link(discord_id, name)
    with_connection do
      find_or_initialize_by(discord_id: discord_id.to_s).update(osrs_name: name)
    end
  end

  def self.name_for(discord_id)
    with_connection do 
      find_by(discord_id: discord_id.to_s)&.osrs_name
    end
  end

  def self.unlink(discord_id)
    with_connection do
      where(discord_id: discord_id.to_s).delete_all
    end
  end
end