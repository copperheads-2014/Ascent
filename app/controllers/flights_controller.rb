class FlightsController < ApplicationController
  def index
    @flights = Flight.all
    @most_liked = @flights.sort_by{|flight| flight.likes.count}
    @latest = @flights.order(created_at: :desc)
    @highest_altitude = @flights.order(max_altitude: :desc)
    @longest_duration = @flights.order(duration: :desc)
    @greatest_distance = @flights.order(distance_traveled: :desc)
    if current_user.try(:all_friends)
      @friends_flights = current_user.all_friends.map(&:flights).sort_by(&:created_at).reverse
    end
  end

  def show
    @flight = Flight.find(params[:id])
    @data_points = @flight.data_points
    @f_comments = @flight.comments.order(created_at: :desc)
  end

  def create
    flight = new_user_flight.import_from_habhub(flight_params[:address])
    redirect_to flight_path(flight)
  end

  def import
    if params[:file]
      if flight = new_user_flight.import_from_csv(params[:file])
        redirect_to new_flight_picture_path(flight), notice: "Your flight has been imported."
      else
        flash[:error] = "Yikes. Something went wrong. Try that again."
        render :new
      end
    else
      redirect_to new_flight_path flash: { error: "Please select a file before uploading" }
    end
  end

  def feed
    @flights = current_user.all_friends.collect{|x| x.flights}.flatten.sort_by{|x| x.created_at}
  end

  private

  def new_user_flight
    ActiveRecord::Base.transaction do
      @flight = Flight.create
      @launch = Launch.create(user_id: current_user.id, flight_id: @flight.id)
      @flight
    end
  end

  def flight_params
    params.require(:new_flight).permit(:address, :user_id)
  end
end
