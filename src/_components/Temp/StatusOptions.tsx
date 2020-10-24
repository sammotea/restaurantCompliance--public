import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";

interface Props {}

const StatusOptions: React.FC<Props> = ({}) => {
   const canReview = useContext(Permission);
   const currentView = useContext(CurrentView);

   return <>{renderStatusOptions()}</>;

   function renderStatusOptions() {
      const statusOptions = getStatusOptions();

      return (
         <ul className={`c-task__statusOptions`}>
            {statusOptions.map((status) => {
               return (
                  <li
                     key={status}
                     className={`c-task__statusOption c-task__statusOption--${status}`}
                  >
                     <span></span>
                  </li>
               );
            })}
         </ul>
      );
   }

   function getStatusOptions() {
      const statusOptions = ["incomplete"];

      if (!canReview) {
         statusOptions.push("awaitingReview", "blocked");
      } else {
         switch (currentView) {
            case "incomplete":
               statusOptions.push(
                  "complete",
                  "failed",
                  "undo" // temp
               );
               break;

            default:
               statusOptions.push(
                  "complete",
                  "failed",
                  "fixed",
                  "undo"
               );
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
