class CommentsController < ApplicationController

  def show
    @comment = Comment.find(params[:id])
    respond_with @comment
  end

  def create_for_flight
    @comment = Comment.create(flight_id: params[:comments][:id], body: params[:comments][:body], user_id: current_user.id, status: 0)
    @json_comment = {body: @comment.body, author: @comment.author.username}

    respond_to do |format|
      format.json { render json: @json_comment, status: :ok}
    end
  end

  def create_for_datapoint
    Comment.create(data_point_id: params[:comments][:data_point], body: params[:comments][:body], user_id: current_user.id, status: 1)
  end
end
