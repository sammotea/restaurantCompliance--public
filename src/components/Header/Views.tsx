import React, { useState, useContext } from "react";

import Permission from "../../contexts/permission";

interface Props {
   hUpdateView(view: string): void;
}

const Views: React.FC<Props> = ({ hUpdateView }) => {
   const canReview = useContext(Permission);
   const statuses = ["incomplete"];
   const cl = `c-viewsWrap`;

   if (canReview) {
      statuses.push("forReview", "complete");
   }

   return (
      <div className={cl}>
         <ul className="c-views">{renderViews()}</ul>
      </div>
   );

   function renderViews() {
      return statuses.map((status) => {
         const clListItem = `c-view c-view--${status}`;

         return (
            <li
               className={clListItem}
               key={status}
               onClick={() => hStatusClick(status)}
            >
               {getTitle(status)}
            </li>
         );
      });
   }

   function getTitle(status: string): string {
      let title = "";

      switch (status) {
         case "incomplete":
            title = "Get it done";
            break;

         case "forReview":
            title = "Needs sign-off";
            break;

         case "complete":
            title = "Already done";
            break;

         default:
            throw new Error("getTitle: unrecognised status");
      }

      return title;
   }

   function hStatusClick(status: string) {
      if (canReview) {
         const curPos = statuses.indexOf(status);
         const nextPos = statuses[curPos + 1] ? curPos + 1 : 0;

         hUpdateView(statuses[nextPos]);
      }
   }
};

export default Views;
