class LikesController < ApplicationController
  def create
    flight = Flight.find(params[:flight_id])
    Like.create(flight_id: params[:flight_id], user_id: current_user.id)
    head :created, location: flight_path(flight)
  end
end
