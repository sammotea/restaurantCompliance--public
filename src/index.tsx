import React, { useState, useReducer } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";

import User from "./_contexts/user";
import Permission from "./_contexts/permission";
import TasksDispatch from "./_contexts/tasksDispatch";
import CurrentView from "./_contexts/currentVIew";

import complianceStateReducer from "./_reducers/complianceStateReducer";
import storifyTasks from "./_reducers/storifyTasks";
import addComplianceDefaults from "./_reducers/addComplianceDefaults";

import Header from "./_components/Temp/Header";
import Views from "./_components/Temp/Views";

import PermissionGate from "./_components/PermissionGate";
import UserSwitch from "./_components/UserSwitch";

const ComplianceTasks: React.FC = () => {
   const [user, setUser] = useState("manager");
   const [currentView, setCurrentView] = useState("incomplete");
   const [store, dispatch] = useReducer(
      complianceStateReducer,
      transformTasksForStore()
   );
   const tasksByStatus = organiseTasksByStatus(store);

   return (
      <User.Provider value={user}>
         <TasksDispatch.Provider value={dispatch}>
            <Permission.Provider value={canReview(user)}>
               <CurrentView.Provider value={currentView}>
                  <div
                     className={`c-compliance c-compliance--${currentView}`}
                  >
                     {renderHeader()}
                     {renderTasks()}
                  </div>
               </CurrentView.Provider>
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
            <nav className="c-nav">
               <UserSwitch user={user} hSwitch={hUserSwitch} />
            </nav>
            <Views hUpdateView={setCurrentView} />
         </Header>
      );
   }

   function hUserSwitch(u) {
      setUser(u);

      if (!canReview(u)) {
         setCurrentView("incomplete");
      }
   }

   function canReview(u) {
      return u === "manager" ? true : false;
   }

   function renderTasks() {
      if (Object.keys(tasksByStatus).length !== 0) {
         return (
            <PermissionGate
               tasksByStatusObj={tasksByStatus}
               view={currentView}
            />
         );
      }
   }
};

render(<ComplianceTasks />, document.getElementById("root"));
