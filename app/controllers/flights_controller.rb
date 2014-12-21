class FlightsController < ApplicationController
  def index
    @flights = Flight.all
  end

  def show
    @flight = Flight.find(params[:id])
    @data_points = @flight.data_points
  end

  private
    def flight_params

    end
end
