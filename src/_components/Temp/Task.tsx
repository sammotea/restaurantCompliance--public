import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";

import StatusOptions from "./StatusOptions";
import MetaOptions from "./MetaOptions";
import Meta from "./Meta";
import Face from "./Face";

import History from "./History";
import Comments from "./Comments";
import CommentsForm from "./CommentsForm";
import Subtasks from "./Subtasks";

interface Props {
   task: iTask;
}

const Task: React.FC<Props> = ({ task }) => {
   const {
      title,
      category,
      compliance: { worker, status: currentStatus, comments },
   } = task;

   const [showStatusOptions, setShowStatusOptions] = useState(false);
   const [showMetaOptions, setShowMetaOptions] = useState(false);
   const [showMeta, setShowMeta] = useState(false);
   const [currentMeta, setCurrentMeta] = useState("");

   const canReview = useContext(Permission);

   return <>{renderTask()}</>;

   function renderTask() {
      return (
         <li
            key={title}
            className={`c-task c-task--${currentStatus} ${
               showStatusOptions ? "js-showStatusOptions" : ""
            } ${showMetaOptions ? "js-showMetaOptions" : ""}`}
         >
            <div className={`c-task__header`}>
               <Face
                  task={task}
                  hShowStatusOptions={hToggleShowStatusOptions}
                  hShowMetaOptions={hToggleShowMetaOptions}
               />
               <StatusOptions
                  task={task}
                  hStatusChange={hStatusChange}
               />
               <MetaOptions
                  currentMeta={currentMeta}
                  hMetaChange={hMetaChange}
               />
            </div>
            <div className={`c-task__body`}>{renderMeta()}</div>
         </li>
      );
   }

   function renderMeta() {
      if (showMeta && currentMeta) {
         const components = [];

         switch (currentMeta) {
            case "comments":
               if (/*canReview*/ true) {
                  components.push(
                     <CommentsForm
                        key={"commentsForm"}
                        taskId={title}
                        taskCat={category}
                     />
                  );
                  components.push(
                     <Comments
                        key={"comments"}
                        taskId={title}
                        taskCat={category}
                        comments={comments}
                     />
                  );
               }

               break;

            case "info":
               if (currentStatus === "incomplete") {
                  components.push(<Subtasks />);
               } else {
                  if (canReview) {
                     components.push(<History />);
                  }
               }
         }

         return <Meta>{components}</Meta>;
      }
   }

   function hStatusChange() {
      hToggleShowStatusOptions();
   }

   function hMetaChange(metaOption) {
      setCurrentMeta(metaOption);
      setShowMeta(metaOption ? true : false);
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
