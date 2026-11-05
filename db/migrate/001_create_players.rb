# frozen_string_literal: true

class CreatePlayers < ActiveRecord::Migration[8.1]
  def change
    create_table :players do |t|
      t.bigint :discord_id, null: false, index: { unique: true }
      t.string :osrs_name, null: false
      t.timestamps
    end
  end
end
