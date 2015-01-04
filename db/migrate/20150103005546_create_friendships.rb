class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.belongs_to :user
      t.belongs_to :friend
      t.boolean :approved, default: false, null: false
      t.timestamps
    end
  end
end
