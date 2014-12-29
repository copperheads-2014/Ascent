require "rails_helper"

describe Flight do
  let(:flight) { Flight.create! }
  let!(:starting_point) { DataPoint.create!(
                          flight_id: flight.id,
                          data: {
                            "latitude" => 1,
                            "longitude" => 2
                            }
                          )}
  let!(:ending_point) { DataPoint.create!(
                          flight_id: flight.id,
                          data: {
                            "latitude" => 3,
                            "longitude" => 4
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
end
