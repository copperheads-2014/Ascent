class LaunchesController < ApplicationController
	def new
		@launch = Launch.new
	end
	def create
		Launch.create(user_id: params[:friend_id], flight_id: params[:flight_id])
		redirect_to user_path(current_user), notice: "Successfully added your friend to the flight!"
	end
end
