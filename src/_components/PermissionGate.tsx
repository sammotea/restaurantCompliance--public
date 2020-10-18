import React, { useContext } from "react";

import User from "../_contexts/user";
import Permission from "../_contexts/permission";

import Statuses from "./Statuses";
import Categories from "./Categories";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const PermissionGate: React.FC<Props> = ({ tasksByStatusObj }) => {
   const user = useContext(User);

   return (
      <>
         {
            <Permission.Provider value={hasPermission()}>
               {renderView()}
            </Permission.Provider>
         }
      </>
   );

   function hasPermission() {
      return user === "manager" ? true : false;
   }

   function renderView() {
      if (hasPermission()) {
         return <Statuses tasksByStatusObj={tasksByStatusObj} />;
      } else {
         let tasksArr = [];

         // Limited view has these merged in to the only visible section
         ["incomplete", "awaitingReview", "blocked"].forEach(
            (status) => {
               if (tasksByStatusObj.hasOwnProperty(status)) {
                  tasksArr = tasksArr.concat(
                     tasksByStatusObj[status]
                  );
               }
            }
         );
         return (
            <Categories tasksArr={tasksArr} status="incomplete" />
         );
      }
   }
};

export default PermissionGate;
