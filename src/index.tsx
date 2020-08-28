import React, { useState } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import parser from "./_helpers/taskParser";
import Todos from "./_components/Todos";

const ComplianceList: React.FC = () => {
  const [tasks, setTasks] = useState(parser.parse(taskJson["tasks"]));

  function handleTodoCompletion(todoTitle: string, todoType: string) {
    setTasks((prevState) => {
      prevState[todoType][todoTitle]["isComplete"] = !prevState[
        todoType
      ][todoTitle]["isComplete"];

      return { ...prevState };
    });
  }

  function renderTodos() {
    if (Object.keys(tasks).length !== 0) {
      return (
        <Todos
          tasksByType={tasks}
          hCompleteTodo={handleTodoCompletion}
        />
      );
    }
  }

  return <>{renderTodos()}</>;
};
render(<ComplianceList />, document.getElementById("root"));
