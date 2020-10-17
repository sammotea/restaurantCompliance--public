import React from "react";

import sorters from "../../_helpers/sorters";

import Status from "./Status";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const Statuses: React.FC<Props> = ({ tasksByStatusObj }) => {
   return <>{renderStatuses()}</>;

   function renderStatuses() {
      const statuses = Object.keys(tasksByStatusObj).map((status) => {
         return (
            <Status
               key={status}
               title={status}
               tasksArr={tasksByStatusObj[status]}
            />
         );
      });

      return <ul>{sorters.byStatus(statuses)}</ul>;
   }
};

export default Statuses;
