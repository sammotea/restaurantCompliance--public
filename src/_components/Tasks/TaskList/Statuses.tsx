import React from "react";
import Status from "./Status";

interface Props {
   tasksByStatusObj: iTasksByStatus;
}

const Statuses: React.FC<Props> = ({ tasksByStatusObj }) => {
   function renderStatuses() {
      return (
         <ul>
            {Object.keys(tasksByStatusObj).map((status) => {
               return (
                  <Status
                     key={status}
                     title={status}
                     tasks={tasksByStatusObj[status]}
                  />
               );
            })}
         </ul>
      );
   }

   return <>{renderStatuses()}</>;
};

export default Statuses;
