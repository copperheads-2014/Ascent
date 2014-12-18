class CreateDataPoints < ActiveRecord::Migration
  def change
    create_table :data_points do |t|
      t.json :data
      t.belongs_to :flight

      t.timestamps
    end
  end
end
