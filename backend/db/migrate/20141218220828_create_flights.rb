class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.string :callsign
      t.string :duration
      t.integer :max_altitude
      t.belongs_to :launch_site

      t.timestamps
    end
  end
end
