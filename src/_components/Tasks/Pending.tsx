import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";

const Pending: React.FC<iTask> = ({
   title,
   subtasks = [],
   compliance: { status, worker, reviewer },
   type,
}) => {
   const [showDetails, setShowDetails] = useState(false);
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   function markTaskForReview(isBlocked = false) {
      dispatch({
         type: "FORREVIEW",
         payload: {
            taskId: title,
            taskCat: type,
            worker: user,
            isBlocked: isBlocked,
         },
      });
   }

   function failTask() {
      dispatch({
         type: "FAILED",
         payload: {
            taskId: title,
            taskCat: type,
            worker: user,
            reviewer: user,
         },
      });
   }

   function resetTask() {
      dispatch({
         type: "RESET",
         payload: {
            taskId: title,
            taskCat: type,
         },
      });
   }

   function completeTask() {
      dispatch({
         type: "COMPLETE",
         payload: {
            taskId: title,
            taskCat: type,
            worker: user,
            reviewer: user,
         },
      });
   }

   function hFailureClick() {
      if (user !== "manager") {
         markTaskForReview(true);
      } else {
         failTask();
      }

      toggleDetails();
   }

   function hTitleClick() {
      if (status !== "pending") {
         resetTask();
      } else {
         if (user !== "manager") {
            markTaskForReview();
         } else {
            completeTask();
         }
      }
   }

   function renderSubtasks() {
      if (subtasks.length) {
         const subtaskList = subtasks.map((subtask) => {
            if ("string" === typeof subtask) {
               const k = subtask.replace(" ", "_").substring(0, 50);

               return (
                  <li key={k} className="[ c-pending__subtask ]">
                     {subtask}
                  </li>
               );
            }
         });

         if (subtaskList.length) {
            return (
               <ul className="[ c-pending__subtasks ]">
                  {subtaskList}
               </ul>
            );
         }
      }
   }

   function renderDetails() {
      return (
         <div className="c-pending__detailsWrap">
            <div className="c-pending__details">
               <div
                  className="c-pending__blockLink"
                  onClick={hFailureClick}
               >
                  Raise an issue?
               </div>
               {renderSubtasks()}
            </div>
         </div>
      );
   }

   function toggleDetails() {
      setShowDetails(!showDetails);
   }

   function renderDetailsToggle() {
      return (
         <span
            className="[ c-pending__detailToggle ]"
            onClick={toggleDetails}
         ></span>
      );
   }

   function renderTitle() {
      return (
         <h1 className="[ c-pending__title ]" onClick={hTitleClick}>
            {title}
         </h1>
      );
   }

   function renderTodo() {
      if (title) {
         let todoClassName = "c-pending";

         todoClassName += showDetails ? " js-show " : "";

         if (worker) {
            if (status === "blocked") {
               todoClassName += " c-pending--isBlocked ";
            } else {
               todoClassName += " c-pending--forReview ";
            }
         }
         todoClassName += worker !== "" ? " js-complete " : "";

         return (
            <li key={title} className={todoClassName}>
               {renderTitle()}
               {renderDetailsToggle()}
               {renderDetails()}
            </li>
         );
      }
   }

   return <>{renderTodo()}</>;
};

export default Pending;
