class ChartsController < ApplicationController
  def index
  end

  def show
  	@flight = Flight.find(params[:id])
  	data_points = @flight.data_points

    @points = data_points.map do |p|
      make_point(p, data_points)
  	end

  	respond_to do |format|
  	  format.json { render json: @points, status: :ok}
  	end
  end

  protected

  def make_point(p, data_points)
    {
      x: (time_from_first_point(p, data_points[0])),
      y: p[:data]['altitude'],
      temp: p[:data]['temperature'] || p[:data]['temperature_external'] || p[:data]['external_temperature'] || p[:data]['temperature_ext'] || p[:data]['ext_temperature'],
      latitude: p[:data]['latitude'],
      longitude: p[:data]['longitude'],
      id: p.id,
      pressure: p[:data]['pressure'],
      battery: p[:data]['battery'],
      comments: p.comments.map do |c|
        { body: c.body, created_at: c.created_at, author_id: c.user_id, author: c.author && c.author.username }
      end
    }
  end

  def format_time(point)
    point.data['time'].to_datetime.strftime('%Q').to_i
  end

  def time_from_first_point(point1, point2)
    format_time(point1) - format_time(point2)
  end
end
