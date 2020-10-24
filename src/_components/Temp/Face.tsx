import React, { useState, useContext } from "react";

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
      const currentStatus = status;
      const cl = `c-task__currentStatus c-task__currentStatus--${currentStatus}`;

      return <div className={cl}></div>;
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
