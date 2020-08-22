import React from "react";
import { render } from "react-dom";
import tasklist from "./_data/tasks.json";

const Application: React.FC = () => {
  console.log(tasklist);

  return <h1>Test</h1>;
};
render(<Application />, document.getElementById("root"));
