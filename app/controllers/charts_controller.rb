class ChartsController < ApplicationController
  def index
  end

  def show
  	@flight = Flight.find(params[:id])
    @points = @flight.data_points.map{ |p| normalized_point(p) }
  	respond_to { |format| format.json { render json: @points, status: :ok } }
  end

  protected

  def normalized_point(p)
    {
      x: time_from_first_point(p),
      y: p[:data]['altitude'],
      temp: p[:data]['temperature'] || p[:data]['temperature_external'] || p[:data]['external_temperature'] || p[:data]['temperature_ext'] || p[:data]['ext_temperature'],
      latitude: p[:data]['latitude'],
      longitude: p[:data]['longitude'],
      id: p.id,
      pressure: p[:data]['pressure'],
      battery: p[:data]['battery'],
      comments: p.comments.map { |c| { body: c.body, created_at: c.created_at, author_id: c.user_id, author: c.author && c.author.username } }
    }
  end

  private

  def format_time(point)
    point.data['time'].to_datetime.strftime('%Q').to_i
  end

  def time_from_first_point(point)
    format_time(point) - format_time(starting_point)
  end

  def starting_point
    @starting_point ||= @flight.data_points.first
  end
end
