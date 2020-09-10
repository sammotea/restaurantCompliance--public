import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import User from "./_contexts/user";
import TasksDispatch from "./_contexts/tasksDispatch";
import parser from "./_helpers/taskParser";
import Todos from "./_components/Todos";
import UserSwitch from "./_components/UserSwitch";
import tasksReducer from "./_reducers/tasksReducer";

const ComplianceList: React.FC = () => {
   // const [tasks, setTasks] = useState(
   //    parser.parse(taskJson["tasks"])
   // );
   const [tasks, dispatch] = useReducer(
      tasksReducer,
      parser.parse(taskJson["tasks"])
   );
   const [user, setUser] = useState("notManager");
   console.log(tasks);

   function renderTodos() {
      if (Object.keys(tasks).length !== 0) {
         return (
            <User.Provider value={user}>
               <TasksDispatch.Provider value={dispatch}>
                  <Todos tasksByType={tasks} />
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
         {renderTodos()}
      </>
   );
};
render(<ComplianceList />, document.getElementById("root"));
