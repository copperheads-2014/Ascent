class User < ActiveRecord::Base
  has_secure_password
  has_many :flights
  has_many :launches
  has_many :friendships
  has_many :normal_friends, through: :friendships, source: :friend
  has_many :inverse_friendships, class_name: "Friendship",foreign_key: "friend_id"
  has_many :inverse_friends, through: :inverse_friendships, source: :user
  has_many :comments

  def self.authenticate(username, password)
    find_by_username(username).try(:authenticate, password)
  end

  def friends
    (normal_friends + inverse_friends).uniq
  end
end
