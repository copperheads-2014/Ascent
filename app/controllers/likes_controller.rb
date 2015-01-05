class LikesController < ApplicationController
  def create
    Like.create(flight_id: params[:likes][:id], user_id: current_user.id)
    head :created, location: flight_path(params[:likes][:id])
  end
end
