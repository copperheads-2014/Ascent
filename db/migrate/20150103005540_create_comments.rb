class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.belongs_to :user
      t.belongs_to :flight
      t.belongs_to :data_point
      t.text       :body
      t.column :status, :integer, default: 0
      t.timestamps
    end
  end
end
