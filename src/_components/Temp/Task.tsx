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
      compliance: { worker, reviewer, status, comments = [] },
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
            className={`c-task c-task--${status} ${
               showStatusOptions ? "js-showStatusOptions" : ""
            } ${showMetaOptions ? "js-showMetaOptions" : ""}`}
         >
            <div className={`c-task__header`}>
               <Face
                  title={title}
                  status={status}
                  hShowStatusOptions={hToggleShowStatusOptions}
                  hShowMetaOptions={hToggleShowMetaOptions}
               />
               <StatusOptions
                  taskStatus={status}
                  hStatusChange={hStatusChange}
               />
               <MetaOptions taskStatus={status} />
            </div>
            <div className={`c-task__body`}>
               <Meta />
            </div>
         </li>
      );
   }

   function hStatusChange(newStatus) {
      let action;
      const payload = {
         taskId: title,
         taskCat: category,
      };
      const s = getStatusBasedOnPermissionLevel(newStatus);

      console.log(s);

      switch (s) {
         case "incomplete":
            action = "reset";
            break;

         case "blocked":
            payload["isBlocked"] = true;
         // NB no break: uses awaitingReview case settings

         case "awaitingReview":
            action = "forReview";
            payload["worker"] = worker ? worker : user;

            break;

         case "complete":
            action = "complete";
            payload["worker"] = worker ? worker : user;
            payload["reviewer"] = user;
            break;

         case "failed":
            action = "fail";
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
               s = "awaitingReview";
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
