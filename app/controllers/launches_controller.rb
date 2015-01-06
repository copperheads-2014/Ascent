class LaunchesController < ApplicationController
	def new
		@launch = Launch.new
	end
	def create
    user = User.find_by(username: params[:username])
		Launch.create(user: user, flight_id: params[:flight_id])
		redirect_to user_path(current_user), notice: "Successfully added your friend to the flight!"
	end
end
