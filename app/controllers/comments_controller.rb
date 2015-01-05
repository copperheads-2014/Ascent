class CommentsController < ApplicationController
  def create_for_flight
    Comment.create(flight_id: params[:comments][:id], body: params[:comments][:body], user_id: current_user.id, status: 0)
  end

  def create_for_datapoint
    Comment.create(data_point_id: params[], body: params[:data_point][:body], user_id: current_user.id)
  end
end
