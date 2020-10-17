import React from "react";
import Task from "./Task";

interface Props {
   tasks: iTask[];
}

const Tasks: React.FC<Props> = ({ tasks }) => {
   function getTasks() {
      return tasks.map((task) => {
         return <Task key={task.title} task={task} />;
      });
   }

   function sortTasks(tasksArr) {
      return [...tasksArr].sort((a, b) => {
         const nameA = a.key.toUpperCase(),
            nameB = b.key.toUpperCase();

         if (nameA < nameB) return -1;
         if (nameA > nameB) return 1;
         return 0;
      });
   }

   function renderTasks() {
      const taskList = getTasks();

      return <ul>{sortTasks(taskList)}</ul>;
   }

   return <>{renderTasks()}</>;
};

export default Tasks;
