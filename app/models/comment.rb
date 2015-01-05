class Comment < ActiveRecord::Base
  enum status: [ :flight, :data_point ]
  belongs_to :user
  belongs_to :flight
  belongs_to :data_point
end
