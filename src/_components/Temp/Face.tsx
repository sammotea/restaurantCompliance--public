import React, { useState, useContext } from "react";
import iconify from "../../_helpers/iconify";
import Permission from "../../_contexts/permission";

interface Props {
   title: string;
   status: string;
   hShowStatusOptions: any;
   hShowMetaOptions: any;
}

const Face: React.FC<Props> = ({
   title,
   status,
   hShowStatusOptions,
   hShowMetaOptions,
}) => {
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
            {getTitle()}
         </h1>
      </div>
   );

   function renderCurrentStatus() {
      // Do blocked etc.
      let currentStatus = status;

      if (!canReview) {
         switch (status) {
            case "blocked":
               currentStatus = "failed";
               break;

            case "awaitingReview":
               currentStatus = "complete";
               break;
         }
      }

      const cl = `c-task__currentStatus c-task__currentStatus--${currentStatus} js-isActive`;

      return (
         <div className={cl}>
            <span className={iconify.getClass(currentStatus)}></span>
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
