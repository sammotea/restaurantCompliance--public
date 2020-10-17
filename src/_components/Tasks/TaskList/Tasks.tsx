import React from "react";
import Task from "./Task";
import sorters from "../../../_helpers/sorters";

interface Props {
   tasks: iTask[];
}

const Tasks: React.FC<Props> = ({ tasks }) => {
   function getTasks() {
      return tasks.map((task) => {
         return <Task key={task.title} task={task} />;
      });
   }

   function renderTasks() {
      const taskList = getTasks();

      return <ul>{sorters.byKey(taskList)}</ul>;
   }

   return <>{renderTasks()}</>;
};

export default Tasks;
