class User < ActiveRecord::Base
  has_secure_password
  has_many :flights
  has_many :launches
  has_many :friendships
  has_many :friends, through: :friendships, source: :user, class_name: "User"
  has_many :comments

    def self.authenticate(username, password)
      find_by_username(username).try(:authenticate, password)
    end
end
