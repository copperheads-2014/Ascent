module HabHub
  def self.parse(json)
    new_hash = {}
    new_hash[:altitude] = json["altitude"]
    new_hash[:latitude] = json["latitude"]
    new_hash[:longitude] = json["longitude"]
    new_hash[:temperature] = json["temperature_external"] || json["temperature"] || json["external_temperature"]
    new_hash[:battery] = json["battery"]
    new_hash[:time] = json["time"]
    new_hash[:humidity] = json["humidity"]
    json['pressure'] ? new_hash[:pressure] = json['pressure'] : new_hash[:pressure] = calculate_pressure(json)
    new_hash
  end

  def self.calculate_pressure(json)
    altitude = json["altitude"]
    ((Flight::SEA_LEVEL_PRESSURE * 100) * (1 - (2.25577 * 10**(-5) * altitude))**5.25588) / 100
  end
end
