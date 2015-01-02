class User < ActiveRecord::Base
  has_secure_password
  has_many :flights

    def self.authenticate(username, password)
      find_by_username(username).try(:authenticate, password)
    end
end
