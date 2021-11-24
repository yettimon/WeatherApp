import React, { FC } from "react";
import { WeatherLocation } from "../../model/Weather";

interface LocationTableProps {
  locations: WeatherLocation[];
  current: WeatherLocation | null;
  onSelect: (location: WeatherLocation) => void;
}

export const LocationTable: FC<LocationTableProps> = ({
  locations,
  onSelect,
  current,
}) => (
  <div className="row justify-content-center d-flex">
    <h2>Locations History</h2>
    {locations.map((location) => (
      <div key={location.id} onClick={() => onSelect(location)}>
        {location.name}
      </div>
    ))}
  </div>
);
