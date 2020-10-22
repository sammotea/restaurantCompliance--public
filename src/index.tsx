import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";

import User from "./_contexts/user";
import Permission from "./_contexts/permission";
import TasksDispatch from "./_contexts/tasksDispatch";

import complianceStateReducer from "./_reducers/complianceStateReducer";
import storifyTasks from "./_reducers/storifyTasks";
import addComplianceDefaults from "./_reducers/addComplianceDefaults";

import Header from "./_components/Temp/Header";
import Statuses from "./_components/Temp/Statuses";

import PermissionGate from "./_components/PermissionGate";
import UserSwitch from "./_components/UserSwitch";

const ComplianceTasks: React.FC = () => {
   const [user, setUser] = useState("manager");
   const [curStatus, setCurStatus] = useState("incomplete");
   const [store, dispatch] = useReducer(
      complianceStateReducer,
      transformTasksForStore()
   );
   const tasksByStatus = organiseTasksByStatus(store);
   const canReview = user === "manager" ? true : false;

   return (
      <User.Provider value={user}>
         <TasksDispatch.Provider value={dispatch}>
            <Permission.Provider value={canReview}>
               {renderHeader()}
               {renderTasks()}
            </Permission.Provider>
         </TasksDispatch.Provider>
      </User.Provider>
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

   function renderHeader() {
      return (
         <Header>
            <UserSwitch user={user} hSwitch={setUser} />
            <Statuses
               status={curStatus}
               hUpdateStatus={setCurStatus}
            />
         </Header>
      );
   }

   function renderTasks() {
      if (Object.keys(tasksByStatus).length !== 0) {
         return (
            <PermissionGate
               tasksByStatusObj={tasksByStatus}
               status={curStatus}
            />
         );
      }
   }
};

render(<ComplianceTasks />, document.getElementById("root"));
