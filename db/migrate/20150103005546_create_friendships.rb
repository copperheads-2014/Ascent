class CreateFriendship < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.belongs_to :user
      t.belongs_to :friend
      t.timestamps
    end
  end
end
