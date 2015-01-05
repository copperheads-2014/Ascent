module FlightsHelper
  def to_feet(meters)
    (meters * 3.28084).round
  end

  def to_miles(km)
    (km * 0.621371).round
  end
end
