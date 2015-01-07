class Friendship < ActiveRecord::Base
  belongs_to :user
  belongs_to :friend, class_name: "User"

  scope :unapproved, -> { where(approved: false) }

  def approve!
    update(approved: true)
  end

  def self.find_id(user, friend)
    @friendship = Friendship.find_by(user_id: friend.id, friend_id: user.id)
    @inverse = Friendship.find_by(user_id: user.id, friend_id: friend.id)
    if @friendship
      @friendship.id
    else
      @inverse.id
    end
  end
end

