import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";
import Permission from "../../_contexts/permission";
import actionSetter from "../../_helpers/actionSetter";

import StatusOptions from "./StatusOptions";
import MetaOptions from "./MetaOptions";
import Meta from "./Meta";
import Face from "./Face";

interface Props {
   task: iTask;
}

const Task: React.FC<Props> = ({ task }) => {
   const {
      title,
      category,
      compliance: {
         worker,
         reviewer,
         status: currentStatus,
         isBlocked,
         isFailed,
         workerFlag,
         comments = [],
      },
   } = task;

   const [showStatusOptions, setShowStatusOptions] = useState(false);
   const [showMetaOptions, setShowMetaOptions] = useState(false);

   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);
   const canReview = useContext(Permission);
   //const [showMeta, setShowMeta] = useState(false);

   return <>{renderTask()}</>;

   function renderTask() {
      return (
         <li
            className={`c-task c-task--${currentStatus} ${
               showStatusOptions ? "js-showStatusOptions" : ""
            } ${showMetaOptions ? "js-showMetaOptions" : ""}`}
         >
            <div className={`c-task__header`}>
               <Face
                  title={title}
                  currentStatus={currentStatus}
                  isBlocked={isBlocked}
                  isFailed={isFailed}
                  workerFlag={workerFlag}
                  hShowStatusOptions={hToggleShowStatusOptions}
                  hShowMetaOptions={hToggleShowMetaOptions}
               />
               <StatusOptions
                  currentStatus={currentStatus}
                  isBlocked={isBlocked}
                  hStatusChange={hStatusChange}
               />
               <MetaOptions taskStatus={currentStatus} />
            </div>
            <div className={`c-task__body`}>
               <Meta />
            </div>
         </li>
      );
   }

   function hStatusChange(action) {
      const payload = {
         taskId: title,
         taskCat: category,
      };

      /**
       ***   NB: Actions can be progressive (incomplete -> complete)
       ***   or regressive (complete -> forReview).
       **/

      switch (action) {
         case "markIncomplete":
            break;

         case "markBlocked":
         case "markForReview":
            /**
             ***   For progress we mark as user, otherwise
             ***   we keep it unchanged (i.e. don’t change
             ***   the worker if the reviewer is undoing a
             ***   mismarked-completed task.)
             **/

            payload["worker"] = worker ? worker : user;
            break;

         case "markFixed":
         case "markFailed":
         case "markComplete":
            payload["worker"] = worker ? worker : user;
            payload["reviewer"] = user;
            break;

         default:
            throw new Error("hStatusChange: status not recognised");
      }

      dispatch(actionSetter[action](payload));
      hToggleShowStatusOptions();
   }

   function getStatusBasedOnPermissionLevel(status) {
      let s = status;

      if (!canReview) {
         switch (status) {
            case "failed":
               s = "blocked";
               break;

            case "complete":
               s = "forReview";
               break;
         }
      }

      return s;
   }

   function hToggleShowStatusOptions() {
      setShowMetaOptions(false);

      if (!showMetaOptions) {
         setShowStatusOptions(!showStatusOptions);
      }
   }

   function hToggleShowMetaOptions() {
      setShowStatusOptions(false);

      if (!showStatusOptions) {
         setShowMetaOptions(!showMetaOptions);
      }
   }
};

export default Task;
