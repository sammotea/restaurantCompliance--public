import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";

interface Props {
   task: iTask;
   hShowStatusOptions: any;
   hShowMetaOptions: any;
}

const Face: React.FC<Props> = ({
   task,
   hShowStatusOptions,
   hShowMetaOptions,
}) => {
   const {
      title,
      compliance: {
         status: currentStatus,
         isBlocked,
         isFailed,
         isFixed,
      },
   } = task;
   const canReview = useContext(Permission);

   return (
      <div className={`c-task__face`}>
         <div
            className={`c-task__currentStatusWrap`}
            onClick={hStatusClick}
         >
            {renderCurrentStatus()}
         </div>
         <h1 className={`c-task__title`} onClick={hTitleClick}>
            <span>{getTitle()}</span>
         </h1>
      </div>
   );

   function renderCurrentStatus() {
      let pseudoStatus = currentStatus;

      if (!canReview) {
         if (currentStatus === "forReview") {
            if (isBlocked) {
               pseudoStatus = "failed";
            } else {
               pseudoStatus = "complete";
            }
         }
      } else {
         switch (currentStatus) {
            case "forReview":
               if (isBlocked) {
                  pseudoStatus = "blocked";
               }
               break;

            case "complete":
               if (isFailed) {
                  pseudoStatus = "failed";
               } else if (isFixed) {
                  pseudoStatus = "fixed";
               }
         }
      }

      const cl = `c-task__currentStatus c-task__currentStatus--${pseudoStatus} js-isSelected`;

      return (
         <div className={cl}>
            <span className={`c-icon c-icon--${pseudoStatus}`}></span>
         </div>
      );
   }

   function getTitle() {
      return title;
   }

   function hTitleClick() {
      hShowMetaOptions();
   }

   function hStatusClick() {
      hShowStatusOptions();
   }
};

export default Face;
