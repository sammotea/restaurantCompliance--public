import React from "react";

interface Props {
   tasks: any;
}

const Subtasks: React.FC<Props> = ({ tasks }) => {
   return <>{renderSubtasks()}</>;

   function renderSubtasks() {
      const subtasks = getSubtasks();

      if (subtasks.length) {
         return <ul className="c-subtasks">{subtasks}</ul>;
      }
   }

   function getSubtasks() {
      return tasks.map((task) => {
         if ("string" === typeof task) {
            const k = task.replace(" ", "_").substring(0, 50);

            return (
               <li key={k} className="[ c-subtask ]">
                  {task}
               </li>
            );
         }
      });
   }
};

export default Subtasks;
