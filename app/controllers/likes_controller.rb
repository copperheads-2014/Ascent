class LikesController < ApplicationController
  def create
    Like.create(flight_id: params[:likes][:id], user_id: current_user.id)
  end
end
