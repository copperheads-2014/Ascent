require "rails_helper"

describe DataPoint do
  let!(:data_point) { DataPoint.create!(data: { "latitude" => 1,
"longitude" => 2 }) }

  describe "#initialize" do
    it "creates a data point instance" do
      expect(data_point).to be_a(DataPoint)
    end
  end

  describe "#data" do
    it "it returns a hash with data" do
      expect(data_point.data.class).to be(Hash)
    end
  end
end
