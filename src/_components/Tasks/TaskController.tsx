import React, { useContext } from "react";
import User from "../../_contexts/user";
import Pending from "./Task/Pending";
import ForReview from "./Task/ForReview";
import Done from "./Task/Done";
import taskStatusReducer from "../../_reducers/taskStatusReducer";
import TasksByCategoryList from "./TaskList/ByCategory";
import TasksByStatusList from "./TaskList/ByStatus";

interface Props {
   tasksByCategoryObj: iTasksByX;
}

const TasksController: React.FC<Props> = ({ tasksByCategoryObj }) => {
   const user = useContext(User);

   function renderTasks(status, tasksArr) {
      const test = tasksArr.map((task) => {
         let el;
         task.key = task.title;

         switch (status) {
            case "pending":
               el = <Pending {...task} />;
               break;

            case "forReview":
               el = <ForReview {...task} />;
               break;

            case "done":
               el = <Done {...task} />;
               break;

            default:
               throw new Error();
         }

         return el;
      });

      return test;
   }

   function renderTasksByStatus(tasksObj) {
      const tasksByStatus: JSX.Element[] = [];

      const canReview = user === "manager";
      const viewPermission = !canReview ? "limited" : "full";

      const tasksByStatusObj = Object.values(tasksObj).reduce(
         taskStatusReducer[viewPermission],
         {
            pending: [], // limited
            forReview: [], // full
            done: [], // full
         }
      );

      for (const status in tasksByStatusObj) {
         if (tasksByStatusObj[status].length) {
            tasksByStatus.push(
               <li className="c-taskSection" key={status}>
                  <TasksByStatusList key={status} status={status}>
                     {renderTasks(status, tasksByStatusObj[status])}
                  </TasksByStatusList>
               </li>
            );
         }
      }

      return tasksByStatus;
   }

   // MISNAMED!
   function renderTasksByCategory() {
      const tasksByCategory: JSX.Element[] = [];

      for (const category in tasksByCategoryObj) {
         tasksByCategory.push(
            <TasksByCategoryList key={category} title={category}>
               {renderTasksByStatus(tasksByCategoryObj[category])}
            </TasksByCategoryList>
         );
      }

      return tasksByCategory;
   }

   return <>{renderTasksByCategory()}</>;
};

export default TasksController;
