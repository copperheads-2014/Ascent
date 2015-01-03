class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.belongs_to :flight
      t.string :image
      t.string :caption
      t.integer :altitude

      t.timestamps
    end
  end
end
