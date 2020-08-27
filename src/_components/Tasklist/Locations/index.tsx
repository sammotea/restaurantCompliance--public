import React from "react";
import Tasks from "../Tasks";

const Locations: React.FC<iTaskMeta> = ({ tasksByLocation }) => {
  function renderTasks(tasks: iTaskList) {
    if (Object.keys(tasks).length !== 0) {
      return <Tasks tasks={tasks} />;
    }
  }

  function renderLocationTitle(locationTitle: string) {
    return (
      <h1 className="[ c-location__title ]">
        <span>The</span>
        {" " + locationTitle}
      </h1>
    );
  }

  function renderLocations() {
    const locations: JSX.Element[] = [];

    for (const location in tasksByLocation) {
      locations.push(
        <li key={location} className="[ c-location ]">
          {renderLocationTitle(location)}
          {renderTasks(tasksByLocation[location])}
        </li>
      );
    }

    return <ul className="[ c-locations ]">{locations}</ul>;
  }

  return <>{renderLocations()}</>;
};

export default Locations;
