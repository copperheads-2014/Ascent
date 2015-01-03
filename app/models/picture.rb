class Picture < ActiveRecord::Base
  belongs_to :flight
  mount_uploader :image, ImageUploader
end
