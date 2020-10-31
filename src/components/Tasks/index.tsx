import React from "react";

import sorters from "../../utils/sorters";

import Task from "./Task/";

interface Props {
   tasksArr: iTask[];
}

const Tasks: React.FC<Props> = ({ tasksArr }) => {
   return <>{renderTasks()}</>;

   function renderTasks() {
      const cl = `c-tasks`;
      const taskList = getTasks();

      return <ul className={cl}>{sorters.byTitle(taskList)}</ul>;
   }

   function getTasks() {
      return tasksArr.map((task) => {
         return (
            <Task key={task.title} title={task.title} task={task} />
         );
      });
   }
};

export default Tasks;
