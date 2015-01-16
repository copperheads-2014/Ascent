class PicturesController < ApplicationController
  def new
    @flight = Flight.find(params[:flight_id])
  end

  def index
    @flight = Flight.find(params[:flight_id])
  end

  def create
    @flight = Flight.find(params[:flight_id])
    files = params[:picture][:files]
    if files
      files.each do |file|
        picture = Picture.new(flight_id: @flight.id, caption: params[:picture][:caption])
        picture.image = file
        picture.save!
      end
    else
      picture = Picture.new(flight_id: @flight.id, caption: params[:picture][:caption])
      picture.remote_image_url = params[:picture][:remote_image_url]
      picture.save!
    end
    redirect_to controller: "flights", action: "show", id: @flight
  end

  def destroy
    pic = Picture.find(params[:id])
    pic.destroy
    respond_to do |format|
      format.html { head :ok }
    end
  end
end
