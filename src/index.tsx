import React from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import parser from "./_helpers/tasklistParser";
import Tasklist from "./_components/Tasklist/";

const Application: React.FC = () => {
  const tasklist = parser.parse(taskJson["tasks"]);
  function renderTasklist() {
    if (Object.keys(tasklist).length !== 0) {
      return <Tasklist tasklist={tasklist} />;
    }
  }

  return <>{renderTasklist()}</>;
};
render(<Application />, document.getElementById("root"));
