class Comment < ActiveRecord::Base
  enum status: [ :flight, :data_point ]
  belongs_to :author, class_name: "User", foreign_key: "user_id"
  belongs_to :flight
  belongs_to :data_point
end
