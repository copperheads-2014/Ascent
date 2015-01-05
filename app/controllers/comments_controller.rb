class CommentsController < ApplicationController
  def create_for_flight
    @comment = Comment.create(flight_id: params[:comments][:id], body: params[:comments][:body], user_id: current_user.id, status: 0)
    return {body: @comment.body, author: @comment.author}.to_json
  end

  def create_for_datapoint
    Comment.create(data_point_id: params[:comments][:data_point], body: params[:comments][:body], user_id: current_user.id, status: 1)
  end
end
