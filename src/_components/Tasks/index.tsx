import React from "react";

import sorters from "../../_helpers/sorters";

import Task from "../Temp/Task";

interface Props {
   tasksArr: iTask[];
}

const Tasks: React.FC<Props> = ({ tasksArr }) => {
   return <>{renderTasks()}</>;

   function renderTasks() {
      const cl = `c-tasks`;
      const taskList = getTasks();

      return <ul className={cl}>{sorters.byKey(taskList)}</ul>;
   }

   function getTasks() {
      return tasksArr.map((task) => {
         return <Task key={task.title} task={task} />;
      });
   }
};

export default Tasks;
