class CreateLaunchSites < ActiveRecord::Migration
  def change
    create_table :launch_sites do |t|
      t.string  :name
      t.string  :coordinates
      t.integer :elevation

      t.timestamps
    end
  end
end
