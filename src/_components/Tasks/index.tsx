import React from "react";
import Task from "./Task";
import sorters from "../../_helpers/sorters";

interface Props {
   tasksArr: iTask[];
}

const Tasks: React.FC<Props> = ({ tasksArr }) => {
   return <>{renderTasks()}</>;

   function renderTasks() {
      const taskList = getTasks();

      return <ul>{sorters.byKey(taskList)}</ul>;
   }

   function getTasks() {
      return tasksArr.map((task) => {
         return <Task key={task.title} task={task} />;
      });
   }
};

export default Tasks;
