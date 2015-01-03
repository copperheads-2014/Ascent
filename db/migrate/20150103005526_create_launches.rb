class CreateLaunches < ActiveRecord::Migration
  def change
    create_table :launches do |t|
      t.belongs_to :user
      t.belongs_to :flight
      t.timestamps
    end
  end
end
