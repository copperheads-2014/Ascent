class FlightsController < ApplicationController
  def index
    @flights = Flight.all
  end

  def show
    @flight = Flight.find(params[:id])
    @data_points = @flight.data_points
  end

  def create
    flight = new_user_flight.import_from_habhub(flight_params[:address])
    redirect_to flight_path(flight)
  end

  def import
    flight = new_user_flight.import_from_csv(params[:file])
    redirect_to flight_path(flight), notice: "Your flight has been imported."
  end

  private

  def new_user_flight
    Flight.new(user_id: current_user.id)
  end

  def flight_params
    params.require(:new_flight).permit(:address, :user_id)
  end
end
