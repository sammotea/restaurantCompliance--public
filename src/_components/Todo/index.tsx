import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";

interface Props extends iTask {
   //handlers: TodoActions;
}

const Todo: React.FC<Props> = ({
   title,
   subtasks = [],
   compliance: { status, worker, reviewer },
   type,
}) => {
   const [showDetails, setShowDetails] = useState(false);
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   function toggleDetails() {
      setShowDetails(!showDetails);
   }

   function hFailureClick() {
      if (user !== "manager") {
         //handlers.forReview(title, type, user, true);
      } else {
         //handlers.isFailed(title, type, user, user);
      }
      toggleDetails();
   }

   function hTitleClick() {
      if (worker) {
         console.log("RESET");
         //handlers.reset(title, type);
      } else {
         if (user !== "manager") {
            console.log("TESTCOMPLETION");
            dispatch({
               type: "COMPLETETASK",
               payload: {
                  taskId: title,
                  taskCat: type,
                  worker: user,
                  reviewer: user,
               },
            });

            //console.log("FOREVIEW");
            //handlers.forReview(title, type, user);
         } else {
            console.log("COMPLETE");
            //handlers.isComplete(title, type, user, user);
         }
      }
   }

   function renderSubtasks() {
      if (subtasks.length) {
         const subtaskList = subtasks.map((subtask) => {
            if ("string" === typeof subtask) {
               const k = subtask.replace(" ", "_").substring(0, 50);

               return (
                  <li key={k} className="[ c-todo__subtask ]">
                     {subtask}
                  </li>
               );
            }
         });

         if (subtaskList.length) {
            return (
               <ul className="[ c-todo__subtasks ]">{subtaskList}</ul>
            );
         }
      }
   }

   function renderDetails() {
      return (
         <div className="c-todo__detailsWrap">
            <div className="c-todo__details">
               <div
                  className="c-todo__addProblem"
                  onClick={hFailureClick}
               >
                  Raise an issue?
               </div>
               {renderSubtasks()}
            </div>
         </div>
      );
   }

   function renderDetailsToggle() {
      return (
         <span
            className="[ c-todo__toggle ]"
            onClick={toggleDetails}
         ></span>
      );
   }

   function renderTitle() {
      return (
         <h1 className="[ c-todo__title ]" onClick={hTitleClick}>
            {title}
         </h1>
      );
   }

   function renderTodo() {
      if (title) {
         let todoClassName = "c-todo";

         todoClassName += showDetails ? " js-show " : "";

         if (title === "Tables") {
            console.log(worker);
         }
         if (worker) {
            if (status === "blocked") {
               todoClassName += " c-todo--hasProblem ";
            } else {
               todoClassName += " c-todo--forReview ";
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

export default Todo;
