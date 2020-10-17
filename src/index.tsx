import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";

import User from "./_contexts/user";
import TasksDispatch from "./_contexts/tasksDispatch";

import complianceStateReducer from "./_reducers/complianceStateReducer";
import storifyTasks from "./_reducers/storifyTasks";
import addComplianceDefaults from "./_reducers/addComplianceDefaults";

import PermissionGate from "./_components/PermissionGate";
import UserSwitch from "./_components/UserSwitch";

const ComplianceTasks: React.FC = () => {
   const [user, setUser] = useState("notManager");
   const [store, dispatch] = useReducer(
      complianceStateReducer,
      transformTasksForStore()
   );
   const tasksByStatus = organiseTasksByStatus(store);

   return (
      <>
         {renderUser()}
         {renderTasks()}
      </>
   );

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
   function renderUser() {
      return <UserSwitch user={user} hSwitch={setUser} />;
   }

   function renderTasks() {
      if (Object.keys(tasksByStatus).length !== 0) {
         return (
            <User.Provider value={user}>
               <TasksDispatch.Provider value={dispatch}>
                  <PermissionGate tasksByStatusObj={tasksByStatus} />
               </TasksDispatch.Provider>
            </User.Provider>
         );
      }
   }
};

render(<ComplianceTasks />, document.getElementById("root"));
