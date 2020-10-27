import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";
import iconify from "../../_helpers/iconify";

interface Props {
   taskStatus: string;
   hStatusChange: any;
}

const StatusOptions: React.FC<Props> = ({
   taskStatus,
   hStatusChange,
}) => {
   const canReview = useContext(Permission);
   const currentView = useContext(CurrentView);

   return <>{renderStatusOptions()}</>;

   function renderStatusOptions() {
      const statusOptions = getStatusOptions();

      return (
         <ul className={`c-task__statusOptions`}>
            {statusOptions.map((status) => {
               // PENDING REFACTOR
               let visibleStatus = status;

               if (!canReview) {
                  switch (status) {
                     case "blocked":
                        visibleStatus = "failed";
                        break;

                     case "awaitingReview":
                        visibleStatus = "complete";
                        break;
                  }
               }

               const cl = `c-task__statusOption c-task__statusOption--${visibleStatus} ${
                  taskStatus === status ? "js-isActive" : ""
               }`;

               return (
                  <li
                     key={visibleStatus}
                     className={cl}
                     onClick={(e) => hStatusClick(visibleStatus)}
                  >
                     <span
                        className={iconify.getClass(visibleStatus)}
                     ></span>
                  </li>
               );
            })}
         </ul>
      );
   }

   function getStatusOptions() {
      const statusOptions = ["incomplete"];

      if (!canReview) {
         // Limited permissions
         statusOptions.push("awaitingReview", "blocked");
      } else {
         switch (currentView) {
            case "incomplete":
               statusOptions.push("complete", "failed");
               break;

            case "awaitingReview":
               statusOptions.push(
                  "complete",
                  "failed",
                  "fixed",
                  "undo"
               );
               break;

            case "complete":
               statusOptions.push(
                  "complete",
                  "failed",
                  "fixed",
                  "undo"
               );
               break;

            default:
               throw new Error("getStatusOptions: unrecognised view");
         }
      }

      return orderOptions(statusOptions);
   }

   function orderOptions(options) {
      const statusOrder = {
         incomplete: 1,
         awaitingReview: 101,
         blocked: 102,
         fixed: 1001,
         complete: 1002,
         failed: 1003,
         undo: 10001,
      };

      return options.sort((a, b) => {
         return statusOrder[a] - statusOrder[b];
      });
   }

   function hStatusClick(status) {
      hStatusChange(status);
   }
};

export default StatusOptions;
