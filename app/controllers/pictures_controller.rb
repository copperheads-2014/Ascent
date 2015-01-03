class PicturesController < ApplicationController

  def index
    @flight = Flight.find(params[:flight_id])
  end

  def create
    flight = Flight.find(params[:flight_id])
    params[:picture][:files].each do |file|
      picture = Picture.new(flight_id: flight.id, caption: params[:picture][:caption])
      picture.image = file
      picture.save!
    end
    redirect_to flight_pictures_path(flight)
  end
end
