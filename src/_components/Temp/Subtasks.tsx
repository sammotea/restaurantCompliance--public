import React, { useState, useContext } from "react";

interface Props {
   subtasks: string[];
}

const Subtasks: React.FC<Props> = ({ subtasks: subtasksArr }) => {
   return <>{renderSubtasks()}</>;

   function renderSubtasks() {
      const subtasks = getSubtasks();
      if (subtasks.length) {
         return <ul className="c-subtasks">{subtasks}</ul>;
      }
   }

   function getSubtasks() {
      return subtasksArr.map((task) => {
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
