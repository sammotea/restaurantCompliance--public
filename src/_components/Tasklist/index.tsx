import React from "react";
import Locations from "./Locations";

const Tasklist: React.FC<iTaskMeta> = ({ tasklist }) => {
  function renderLocations() {
    if (Object.keys(tasklist).length !== 0) {
      return <Locations tasksByLocation={tasklist} />;
    }
  }

  return <>{renderLocations()}</>;
};

export default Tasklist;
