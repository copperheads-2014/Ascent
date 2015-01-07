class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, class_name: "User"

  def self.find_id(user, friend)
    @friendship = Friendship.find_by(user_id: friend.id, friend_id: user.id).id
  end
end

