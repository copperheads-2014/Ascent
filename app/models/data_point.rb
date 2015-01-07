class DataPoint < ActiveRecord::Base
  belongs_to :flight
  has_many :comments

  def comment
    comments.includes(:author).first
  end

  def comment_author
    comment.author.username
  end
end
