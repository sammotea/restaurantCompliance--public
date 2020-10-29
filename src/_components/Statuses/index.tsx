import React from "react";

import sorters from "../../_helpers/sorters";

import Status from "./Status";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const Views: React.FC<Props> = ({ tasksByStatusObj }) => {
   return <>{renderViews()}</>;

   function renderViews() {
      const cl = `c-views`;
      const statuses = [];

      ["incomplete", "forReview", "complete"].forEach((status) => {
         if (tasksByStatusObj.hasOwnProperty(status)) {
            let tasksArr = [];

            switch (status) {
               case "forReview":
                  if (tasksByStatusObj.hasOwnProperty("blocked")) {
                     tasksArr = tasksArr.concat(
                        tasksByStatusObj["blocked"]
                     );
                  }
                  break;

               case "complete":
                  if (tasksByStatusObj.hasOwnProperty("failed")) {
                     tasksArr = tasksArr.concat(
                        tasksByStatusObj["failed"]
                     );
                  }
                  break;
            }

            tasksArr = tasksArr.concat(tasksByStatusObj[status]);

            statuses.push(
               <Status
                  key={status}
                  title={status}
                  tasksArr={tasksArr}
               />
            );
         }
      });

      return <ul className={cl}>{sorters.byStatus(statuses)}</ul>;
   }
};

export default Views;
