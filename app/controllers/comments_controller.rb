class CommentsController < ApplicationController

  def show
    @comment = Comment.find(params[:id])
    respond_with @comment
  end

  def create
    p params[:comment]
    flight = Flight.find(params[:comment][:flight_id])
    @comment = Comment.new(flight_id: flight.id, data_point_id: params[:comment][:data_point_id], body: params[:comment][:body], user_id: current_user.id)
    if params[:comment][:data_point_id].present?
      @comment.update(status: 1)
    end
    @comment.save
    redirect_to flight_path(flight)
  end

end
