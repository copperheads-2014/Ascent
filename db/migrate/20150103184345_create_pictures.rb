class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.belongs_to :user
      t.belongs_to :flight
      t.string :caption, :url
      t.integer :altitude

      t.timestamps
    end
  end
end
