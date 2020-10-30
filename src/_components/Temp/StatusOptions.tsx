import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";
import camelcaseify from "../../_helpers/transforms";
import actionSetter from "../../_helpers/actionSetter";

interface Props {
   task: iTask;
   hStatusChange: any;
}

const StatusOptions: React.FC<Props> = ({ task, hStatusChange }) => {
   const {
      title,
      category,
      compliance: {
         worker,
         reviewer,
         status: currentStatus,
         isBlocked,
         isFailed,
         isFixed,
      },
   } = task;
   const user = useContext(User);
   const canReview = useContext(Permission);
   const currentView = useContext(CurrentView);
   const dispatch = useContext(TasksDispatch);

   return <>{renderStatusOptions()}</>;

   function renderStatusOptions() {
      const statusOptions = getStatusOptions();

      return (
         <ul className={`c-task__statusOptions`}>
            {statusOptions.map((statusOption) => {
               /**
                *    Tasks marked forReview show as if they have been
                *    completed to !canReview-ers.
                *
                *    We use 'pseudoStatus' to account for that: it’s the sam
                *    as 'statusOption' for everyone else.
                */

               const isSelected = checkIsCurrentStatus(statusOption);
               const action = getActionFromStatus(statusOption);
               const cl = `c-task__statusOption c-task__statusOption--${statusOption} ${
                  isSelected ? "js-isSelected" : ""
               }`;

               return (
                  <li
                     key={statusOption}
                     className={cl}
                     onClick={(e) => hStatusClick(action)}
                  >
                     <span
                        className={`c-icon c-icon--${statusOption}`}
                     ></span>
                  </li>
               );
            })}
         </ul>
      );
   }

   function getStatusOptions() {
      const statusOptions = [];

      switch (currentView) {
         case "incomplete":
            statusOptions.push("incomplete", "complete", "failed");
            break;

         case "forReview":
         case "complete":
            statusOptions.push("complete", "failed", "fixed", "undo");
            break;

         default:
            throw new Error("getStatusOptions: unrecognised view");
      }

      return orderOptions(statusOptions);
   }

   function checkIsCurrentStatus(statusOption) {
      let isSelected = false;

      /**
       *    Being explicit: if there is a simpler, more robust
       *    way of writing this logic I have failed to find it.
       */
      switch (currentStatus) {
         case "incomplete":
            isSelected = currentStatus === statusOption;
            break;

         case "forReview":
            if (!canReview) {
               // "Complete" and awaiting review
               if (statusOption === "complete" && !isBlocked) {
                  isSelected = true;
               }

               // "Failed" and awaiting review
               if (statusOption === "failed" && isBlocked) {
                  isSelected = true;
               }
            } else {
               isSelected = currentStatus === statusOption;
            }

            break;

         case "complete":
            // Done
            if (
               statusOption === "complete" &&
               !isFailed &&
               !isFixed
            ) {
               isSelected = true;
            }

            // Failed
            if (statusOption === "failed" && isFailed) {
               isSelected = true;
            }

            // Fixed
            if (statusOption === "fixed" && isFixed) {
               isSelected = true;
            }

            break;
      }

      return isSelected;
   }

   function getActionFromStatus(statusOption) {
      let action = statusOption;

      switch (statusOption) {
         case "complete":
            if (!canReview) {
               action = "forReview";
            }
            break;

         case "failed":
            if (!canReview) {
               action = "blocked";
            }
            break;

         case "undo":
            if (currentStatus === "forReview") {
               action = "incomplete";
            } else if (currentStatus === "complete") {
               if (worker !== reviewer) {
                  if (isBlocked) {
                     action = "blocked";
                  } else {
                     action = "forReview";
                  }
               } else {
                  action = "incomplete";
               }
            }
            break;
      }

      return camelcaseify("mark " + action);
   }

   function orderOptions(options) {
      const statusOrder = {
         incomplete: 1,
         complete: 101,
         fixed: 1001,
         failed: 1002,
         undo: 10001,
      };

      return options.sort((a, b) => {
         return statusOrder[a] - statusOrder[b];
      });
   }

   function hStatusClick(action) {
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

      hStatusChange();
   }
};

export default StatusOptions;
