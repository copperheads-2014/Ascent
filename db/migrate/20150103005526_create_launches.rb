class CreateLaunches < ActiveRecord::Migration
  def change
    create_table :launches do |t|
      t.belongs_to :user
      t.belongs_to :flight
      t.date       :launch_date
      t.timestamps
    end
  end
end
