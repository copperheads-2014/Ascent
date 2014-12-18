class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.string :callsign
      t.belongs_to :launch_site

      t.timestamps
    end
  end
end
