import React, { useContext } from "react";

import User from "../_contexts/user";
import Permission from "../_contexts/permission";

import Views from "./Views";
import Categories from "./Categories";

interface Props {
   tasksByStatusObj: iTasksByStatus;
   view: string;
}

const PermissionGate: React.FC<Props> = ({
   tasksByStatusObj,
   view,
}) => {
   const canReview = useContext(Permission);

   // Limited view is only for incomplete tasks
   if (!canReview && view !== "incomplete") return <></>;

   return <>{renderView()}</>;

   function renderView() {
      const tasksArr = getTasks();

      if (tasksArr.length) {
         return <Categories tasksArr={tasksArr} view={view} />;
      } else {
         return <>Nothing Here!</>;
      }
   }

   function getTasks() {
      if (canReview) {
         return tasksByStatusObj.hasOwnProperty(view)
            ? tasksByStatusObj[view]
            : [];
      } else {
         let tArr = [];

         // Limited view has these merged in to the only visible section
         ["incomplete", "awaitingReview", "blocked"].forEach(
            (view) => {
               if (tasksByStatusObj.hasOwnProperty(view)) {
                  tArr = tArr.concat(tasksByStatusObj[view]);
               }
            }
         );

         return tArr;
      }
   }
};

export default PermissionGate;
