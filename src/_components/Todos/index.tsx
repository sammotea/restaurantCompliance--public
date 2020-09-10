import React, { useContext } from "react";
import User from "../../_contexts/user";
import Todo from "../Todo";
import Toreview from "../Toreview";
import Done from "../Done";

interface Props {
   tasksByType: iTasksByX;
}

const Todos: React.FC<Props> = ({ tasksByType }) => {
   const user = useContext(User);

   function renderTodoList(tasks: iTaskList) {
      if (Object.keys(tasks).length !== 0) {
         const todoList: JSX.Element[] = [];
         const todos: JSX.Element[] = [];
         const toreviews: JSX.Element[] = [];
         const dones: JSX.Element[] = [];

         for (const [title, task] of Object.entries(tasks)) {
            if (
               task.status !== "complete" &&
               task.status !== "failed"
            ) {
               if (!task.worker) {
                  todos.push(<Todo key={title} {...task} />);
               } else {
                  if (user === "manager") {
                     if (task.worker === user) {
                        dones.push(<Done key={title} {...task} />);
                     } else {
                        toreviews.push(
                           <Toreview key={title} {...task} />
                        );
                     }
                  } else {
                     todos.push(<Todo key={title} {...task} />);
                  }
               }
            } else {
               if (user === "manager") {
                  dones.push(<Done key={title} {...task} />);
               }
            }
         }

         if (todos.length) {
            todoList.push(
               <ul key="todos" className="[ c-todos ]">
                  {todos}
               </ul>
            );
         }

         if (toreviews.length) {
            todoList.push(
               <>
                  <h1 className="todoSection__subtitle">
                     Awaiting sign-off
                  </h1>
                  <ul key="toreviews" className="[ c-toreviews ]">
                     {toreviews}
                  </ul>
               </>
            );
         }

         if (dones.length) {
            todoList.push(
               <>
                  <h1 className="todoSection__subtitle">Reviewed</h1>
                  <ul key="dones" className="[ c-dones ]">
                     {dones}
                  </ul>
               </>
            );
         }

         return <>{todoList}</>;
      }
   }

   function renderSectionTitle(type: string) {
      return (
         <h1 className="[ c-todoSection__title ]">
            <span>The</span>
            {" " + type}
         </h1>
      );
   }

   function renderTodoSections() {
      const sections: JSX.Element[] = [];

      for (const type in tasksByType) {
         sections.push(
            <li key={type} className="[ c-todoSection ]">
               {renderSectionTitle(type)}
               {renderTodoList(tasksByType[type] as iTaskList)}
            </li>
         );
      }

      return <ul className="[ c-todoSections ]">{sections}</ul>;
   }

   return <>{renderTodoSections()}</>;
};

export default Todos;
