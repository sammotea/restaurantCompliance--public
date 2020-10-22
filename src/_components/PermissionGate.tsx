import React, { useContext } from "react";

import User from "../_contexts/user";
import Permission from "../_contexts/permission";

import Statuses from "./Statuses";
import Categories from "./Categories";

interface Props {
   tasksByStatusObj: iTasksByStatus;
   status: string;
}

const PermissionGate: React.FC<Props> = ({
   tasksByStatusObj,
   status,
}) => {
   const canReview = useContext(Permission);

   // Limited view is only for incomplete tasks
   if (!canReview && status !== "incomplete") return <></>;

   return <>{renderView()}</>;

   function renderView() {
      const tasksArr = getTasks();

      if (tasksArr.length) {
         return <Categories tasksArr={tasksArr} status={status} />;
      } else {
         return <>Nothing Here!</>;
      }
   }

   function getTasks() {
      if (canReview) {
         return tasksByStatusObj.hasOwnProperty(status)
            ? tasksByStatusObj[status]
            : [];
      } else {
         let tArr = [];

         // Limited view has these merged in to the only visible section
         ["incomplete", "awaitingReview"].forEach((status) => {
            if (tasksByStatusObj.hasOwnProperty(status)) {
               tArr = tArr.concat(tasksByStatusObj[status]);
            }
         });

         return tArr;
      }
   }
};

export default PermissionGate;
