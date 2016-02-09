class CommentsController < ApplicationController

  def show
    @comment = Comment.find(params[:id])
    respond_with @comment
  end

  def create
    if request.xhr?
      @comment = Comment.new(flight_id: params[:attributes][:flight_id], data_point_id: params[:attributes][:data_point_id], body: params[:attributes][:body], user_id: current_user.id)
      @comment.update(status: 1) if params[:attributes][:data_point_id].present?
      @comment.save
      render json: { "body" => params[:attributes][:body], "author" => current_user.username, "user_id" => current_user.id }
    else
      @comment = Comment.new(flight_id: params[:comment][:flight_id], data_point_id: params[:comment][:data_point_id], body: params[:comment][:body], user_id: current_user.id)
      @comment.update(status: 1) if params[:comment][:data_point_id].present?
      @comment.save
      redirect_to flight_path(flight)
    end
  end
end
