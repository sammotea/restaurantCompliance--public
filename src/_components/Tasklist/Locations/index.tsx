import React from "react";
import Location from "./Location/index";

const Locations: React.FC<iTaskMeta> = ({ tasksByLocation }) => {
  console.log(tasksByLocation);

  const locations: JSX.Element[] = [];

  for (const location in tasksByLocation) {
    locations.push(
      <Location
        key={location}
        name={location}
        tasksByCategory={tasksByLocation[location]}
      />
    );
  }

  function renderLocations() {
    if (locations.length) {
      return <ul className="[ c-locations ]">{locations}</ul>;
    }
  }

  return <>{renderLocations()}</>;
};

export default Locations;
