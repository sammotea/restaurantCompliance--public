import React, { useContext } from "react";
import User from "../../_contexts/user";
import Statuses from "./TaskList/Statuses";
import Categories from "./TaskList/Categories";
import Permission from "../../_contexts/permission";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const PermissionController: React.FC<Props> = ({
   tasksByStatusObj,
}) => {
   const user = useContext(User);

   function hasPermission() {
      return user === "manager" ? true : false;
   }

   function renderView() {
      if (hasPermission()) {
         return <Statuses tasksByStatusObj={tasksByStatusObj} />;
      } else {
         let tasks = [];

         ["incomplete", "awaitingReview", "blocked"].forEach(
            (status) => {
               if (tasksByStatusObj.hasOwnProperty(status)) {
                  tasks = tasks.concat(tasksByStatusObj[status]);
               }
            }
         );
         return <Categories tasks={tasks} />;
      }
   }

   return (
      <>
         {
            <Permission.Provider value={hasPermission()}>
               {renderView()}
            </Permission.Provider>
         }
      </>
   );
};

export default PermissionController;
