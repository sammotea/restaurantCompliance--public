import React from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import parser from "./_helpers/taskParser";
import Todos from "./_components/Todos";

const ComplianceList: React.FC = () => {
  const tasksByType = parser.parse(taskJson["tasks"]);

  function renderTodos() {
    if (Object.keys(tasksByType).length !== 0) {
      return <Todos tasksByType={tasksByType} />;
    }
  }

  return <>{renderTodos()}</>;
};
render(<ComplianceList />, document.getElementById("root"));
