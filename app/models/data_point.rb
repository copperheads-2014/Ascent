class DataPoint < ActiveRecord::Base
  belongs_to :flight
  has_many :comments
end
