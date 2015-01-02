class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.string     :callsign
      t.string     :duration
      t.integer    :max_altitude
      t.float 	   :distance_traveled
      t.belongs_to :launch_site
      t.belongs_to :user

      t.timestamps
    end
  end
end
