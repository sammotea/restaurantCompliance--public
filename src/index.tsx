import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import User from "./_contexts/user";
import TasksDispatch from "./_contexts/tasksDispatch";
import TasksController from "./_components/Tasks/TaskController";
import UserSwitch from "./_components/UserSwitch";
import complianceReducer from "./_reducers/complianceReducer";
import taskParser from "./_reducers/taskParser";

const ComplianceList: React.FC = () => {
   const [tasks, dispatch] = useReducer(
      complianceReducer,
      taskJson["tasks"].reduce(taskParser, {})
   );
   const [user, setUser] = useState("notManager");

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
