import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";
import iconify from "../../_helpers/iconify";
import camelcaseify from "../../_helpers/transforms";

interface Props {
   currentStatus: string;
   isBlocked: boolean;
   hStatusChange: any;
}

const StatusOptions: React.FC<Props> = ({
   currentStatus,
   hStatusChange,
   isBlocked,
}) => {
   const canReview = useContext(Permission);
   const currentView = useContext(CurrentView);

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

               let pseudoStatus = getPseudoStatus(statusOption);
               let isActive = false;

               if (!canReview && currentStatus === "forReview") {
                  if (
                     (pseudoStatus === "forReview" && !isBlocked) ||
                     (pseudoStatus === "blocked" && isBlocked)
                  ) {
                     isActive = true;
                  }
               } else {
                  if (currentStatus === pseudoStatus) {
                     isActive = true;
                  }
               }

               const cl = `c-task__statusOption c-task__statusOption--${statusOption} ${
                  isActive ? "js-isActive" : ""
               }`;

               // NB Uses pseudoStatus *not* statusOption
               const action = getActionFromStatus(pseudoStatus);

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

   function getPseudoStatus(s) {
      let pseudoStatus = s;

      if (!canReview) {
         switch (s) {
            case "complete":
               pseudoStatus = "forReview";
               break;
            case "failed":
               pseudoStatus = "blocked";
               break;
         }
      }

      return pseudoStatus;
   }

   function getActionFromStatus(pseudoStatus) {
      let action = pseudoStatus;

      switch (pseudoStatus) {
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

   function hStatusClick(pseudoStatus) {
      hStatusChange(pseudoStatus);
   }
};

export default StatusOptions;
