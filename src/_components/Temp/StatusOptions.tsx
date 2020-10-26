import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";
import iconify from "../../_helpers/iconify";

interface Props {
   taskStatus: string;
}

const StatusOptions: React.FC<Props> = ({ taskStatus }) => {
   const canReview = useContext(Permission);
   const currentView = useContext(CurrentView);

   return <>{renderStatusOptions()}</>;

   function renderStatusOptions() {
      const statusOptions = getStatusOptions();

      return (
         <ul className={`c-task__statusOptions`}>
            {statusOptions.map((status) => {
               const cl = `c-task__statusOption c-task__statusOption--${status} ${
                  taskStatus === status ? "js-isActive" : ""
               }`;

               return (
                  <li key={status} className={cl}>
                     <span
                        className={iconify.getClass(status)}
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
         blocked: 101,
         awaitingReview: 102,
         fixed: 1001,
         complete: 1002,
         failed: 1003,
         undo: 10001,
      };

      return options.sort((a, b) => {
         return statusOrder[a] - statusOrder[b];
      });
   }
};

export default StatusOptions;
