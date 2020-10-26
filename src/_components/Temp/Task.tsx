import React, { useState, useContext } from "react";
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
               <StatusOptions taskStatus={status} />
               <MetaOptions taskStatus={status} />
            </div>
            <div className={`c-task__body`}>
               <Meta />
            </div>
         </li>
      );
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
