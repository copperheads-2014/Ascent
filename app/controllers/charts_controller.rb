class ChartsController < ApplicationController
  def index
  end

  def show
  	@flight = Flight.find(params[:id])
  	@points = []
  	data_points = @flight.data_points
  	data_points.each do |p| 
  		@points << { x: p[:data]['time'],
  					 y: p[:data]['altitude'],
  					 temp: p[:data]['temperature']}
  	end

  	respond_to do |format|
  	  format.json { render json: @points, status: :ok}
  	end
  end
end
