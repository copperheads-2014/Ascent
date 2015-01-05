class User < ActiveRecord::Base
  has_secure_password
  has_many :launches
  has_many :flights, through: :launches
  # has_many :friendships
  # has_many :friends, through: :friendships
  # has_many :inverse_friendships, class_name: "Friendship", foreign_key: "friend_id"
  # has_many :inverse_friends, through: :inverse_friendships, source: :user

  has_many :friendships
  has_many :friends, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user
  has_many :comments
  has_many :likes
  has_many :liked_flights, through: :likes, source: :flight

  mount_uploader :avatar, ImageUploader

  def self.authenticate(username, password)
    find_by_username(username).try(:authenticate, password)
  end

  def all_friends
    (friends + inverse_friends).uniq
  end

  def approved_friends
    friendships.where("approved = true").map(&:friend)
  end

  def pending_friends
    friendships.where("approved = false").map(&:friend)
  end

  def friend_requests
    inverse_friendships.where("approved = false")
  end
end
