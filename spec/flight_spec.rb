require "rails_helper"

describe Flight do
  let(:flight) { Flight.create!(callsign: "TEST") }
  let!(:starting_point) { DataPoint.create!(
                          flight_id: flight.id,
                          data: {
                            "latitude" => 1,
                            "longitude" => 2,
                            "time" => "00:00:00",
                            "altitude" => 0
                            }
                          )}
  let!(:mid_point) { DataPoint.create!(
                          flight_id: flight.id,
                          data: {
                            "altitude" => 100
                            }
                          )}
  let!(:ending_point) { DataPoint.create!(
                          flight_id: flight.id,
                          data: {
                            "latitude" => 3,
                            "longitude" => 4,
                            "time" => "10:12:34",
                            "altitude" => 0
                            }
                          )}

  describe "#initialize" do
    it "creates a flight instance" do
      expect(flight).to be_a(Flight)
    end
  end

  describe "#starting_point" do
    it "returns the coordinate for its first data point" do
      expect(flight.starting_point).to eq([1,2])
    end
  end

  describe "#ending_point" do
    it "returns the coordinate for its last data point" do
      expect(flight.ending_point).to eq([3,4])
    end
  end

  describe "#distance_traveled" do
    it "returns the total distance traveled" do
      expect(flight.distance_traveled.round).to eq(314)
    end
  end

  describe "#callsign" do
    it "has a callsign" do
      expect(flight.callsign).to eq("TEST")
    end
  end

  describe "#start_time" do
    it "returns the flight start time" do
      expect(flight.start_time).to eq("00:00:00")
    end
  end

  describe "#end_time" do
    it "returns the flight end time" do
      expect(flight.end_time).to eq("10:12:34")
    end
  end

  describe "#max_altitude_data_point" do
    it "returns the data point with the highest altitude" do
      expect(flight.max_altitude_data_point).to eq(mid_point)
    end
  end

  describe "#max_altitude" do
    it "returns the maximum altitude reached during the flight" do
      expect(flight.max_altitude).to eq(100)
    end
  end
end
