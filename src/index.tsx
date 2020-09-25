import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import User from "./_contexts/user";
import TasksDispatch from "./_contexts/tasksDispatch";
import parser from "./_helpers/taskParser";
import TasksController from "./_components/Tasks/TaskController";
import UserSwitch from "./_components/UserSwitch";
import tasksReducer from "./_reducers/tasksReducer";
import taskHandlers from "./_helpers/taskHandlers";

const ComplianceList: React.FC = () => {
   const [tasks, dispatch] = useReducer(
      tasksReducer,
      parser.parse(taskJson["tasks"])
   );
   const [user, setUser] = useState("notManager");
   taskHandlers.setDispatch(dispatch);
   function renderTasks() {
      if (Object.keys(tasks).length !== 0) {
         return (
            <User.Provider value={user}>
               <TasksDispatch.Provider value={dispatch}>
                  <TasksController tasksByCategoryObj={tasks} />
               </TasksDispatch.Provider>
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
         {renderTasks()}
      </>
   );
};
render(<ComplianceList />, document.getElementById("root"));
