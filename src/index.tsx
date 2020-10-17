import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import User from "./_contexts/user";
import TasksDispatch from "./_contexts/tasksDispatch";
import PermissionController from "./_components/Tasks/PermissionController";
import UserSwitch from "./_components/UserSwitch";
import complianceReducer from "./_reducers/complianceReducer";
import storifyTasks from "./_reducers/storifyTasks";
import addComplianceDefaults from "./_reducers/addComplianceDefaults";
import cat from "./_reducers/organiseByCategory";
import old from "./_reducers/taskParser--old";

const ComplianceList: React.FC = () => {
   const [user, setUser] = useState("notManager");
   const [store, dispatch] = useReducer(
      complianceReducer,
      transformTasksForStore()
   );
   const tasksByStatus = organiseTasksByStatus(store);

   return (
      <>
         {renderUser()}
         {renderTasks()}
      </>
   );

   function renderTasks() {
      if (Object.keys(tasksByStatus).length !== 0) {
         return (
            <User.Provider value={user}>
               <TasksDispatch.Provider value={dispatch}>
                  <PermissionController
                     tasksByStatusObj={tasksByStatus}
                  />
               </TasksDispatch.Provider>
            </User.Provider>
         );
      }
   }

   function renderUser() {
      return <UserSwitch user={user} hSwitch={setUser} />;
   }

   function transformTasksForStore() {
      const tasksRaw = [...taskJson["tasks"]];
      const tasksRawWithDefaults = [...tasksRaw].reduce(
         addComplianceDefaults,
         []
      );
      const tasksStore = tasksRawWithDefaults.reduce(
         storifyTasks,
         {}
      );
      return tasksStore;
   }

   function organiseTasksByStatus(fromStore) {
      let tasksObj = {};

      for (const category in fromStore) {
         for (const taskId in fromStore[category]) {
            const task = fromStore[category][taskId];
            const status = task.compliance.status;

            tasksObj[status] = tasksObj[status] || [];
            tasksObj[status].push(task);
         }
      }

      return tasksObj;
   }
};
render(<ComplianceList />, document.getElementById("root"));
