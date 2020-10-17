import React from "react";
import Status from "./Status";
import sorters from "../../../_helpers/sorters";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const Statuses: React.FC<Props> = ({ tasksByStatusObj }) => {
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

      return <ul>{sorters.byStatus(statuses)}</ul>;
   }

   return <>{renderStatuses()}</>;
};

export default Statuses;
