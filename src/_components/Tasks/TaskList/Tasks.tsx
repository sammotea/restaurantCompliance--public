import React from "react";
import Task from "./Task";

interface Props {
   tasks: iTask[];
}

const Tasks: React.FC<Props> = ({ tasks }) => {
   function renderTasks() {
      return (
         <ul>
            {tasks.map((task) => {
               return <Task key={task.title} task={task} />;
            })}
         </ul>
      );
   }

   return <>{renderTasks()}</>;
};

export default Tasks;
