import React, { useState } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import User from "./_data/user";
import parser from "./_helpers/taskParser";
import Todos from "./_components/Todos";
import UserSwitch from "./_components/UserSwitch";
import TodoActions from "./_helpers/todoHandlers";

const ComplianceList: React.FC = () => {
  const [tasks, setTasks] = useState(parser.parse(taskJson["tasks"]));
  const [user, setUser] = useState("notManager");
  TodoActions.init(setTasks);

  function renderTodos() {
    if (Object.keys(tasks).length !== 0) {
      return (
        <User.Provider value={user}>
          <Todos tasksByType={tasks} handlers={TodoActions} />
        </User.Provider>
      );
    }
  }

  function renderUser() {
    return <UserSwitch user={user} hSwitch={setUser} />;
  }

  return (
    <>
      {renderUser()}
      {renderTodos()}
    </>
  );
};
render(<ComplianceList />, document.getElementById("root"));
