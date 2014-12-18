class CreateLaunchSites < ActiveRecord::Migration
  def change
    create_table :launch_sites do |t|
      t.string  :name
      # t.column  :coordinates, :point
      t.integer :elevation
      t.timestamps
    end
  end
end
