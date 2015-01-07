class DataPoint < ActiveRecord::Base
  belongs_to :flight
  has_many :comments

  def comment
    comments.first
  end

  def comment_author
    comment.author
  end
end
