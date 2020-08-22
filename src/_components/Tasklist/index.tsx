import React from "react";
import Locations from "./Locations";

const Tasklist: React.FC<iTaskMeta> = ({ tasklist }) => {
  return <Locations tasksByLocation={tasklist} />;
};

export default Tasklist;
