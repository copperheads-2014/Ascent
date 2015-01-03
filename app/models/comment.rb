class Comment < ActiveRecord::Base
  enum status: [ :flight, :data_point ]
  belongs_to :user
  belongs_to :flight
end
