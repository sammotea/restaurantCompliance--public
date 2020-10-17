import React from "react";
import Status from "./Status";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const Statuses: React.FC<Props> = ({ tasksByStatusObj }) => {
   function sortStatuses(statusesArr) {
      const statusOrder = {
         incomplete: 0,
         awaitingReview: 100,
         blocked: 100,
         complete: 1000,
         failed: 1000,
      };

      return [...statusesArr].sort((a, b) => {
         return statusOrder[a.key] - statusOrder[b.key];
      });
   }

   function renderStatuses() {
      const statuses = Object.keys(tasksByStatusObj).map((status) => {
         return (
            <Status
               key={status}
               title={status}
               tasks={tasksByStatusObj[status]}
            />
         );
      });

      return <ul>{sortStatuses(statuses)}</ul>;
   }

   return <>{renderStatuses()}</>;
};

export default Statuses;
