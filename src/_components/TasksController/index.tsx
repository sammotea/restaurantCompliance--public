import React, { useContext } from "react";
import User from "../../_contexts/user";
import Pending from "../Tasks/Pending";
import ForReview from "../Tasks/ForReview";
import Done from "../Tasks/Done";
import taskStatusReducer from "../../_reducers/taskStatusReducer";
import TasksByCategoryList from "../../_components/Lists/TasksByCategoryList";
import TasksByStatusList from "../../_components/Lists/TasksByStatusList";

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
            case "Pending":
               el = <Pending {...task} />;
               break;

            case "ForReview":
               el = <ForReview {...task} />;
               break;

            case "Done":
               el = <Done {...task} />;
               break;

            default:
               throw new Error();
         }

         return el;
      });

      return test;
   }

   function renderTasksByStatus(tasksArr) {
      const tasksByStatus: JSX.Element[] = [];

      const canReview = user === "manager";
      const viewPermission = !canReview ? "limited" : "full";

      const tasksByStatusObj = Object.values(tasksArr).reduce(
         taskStatusReducer[viewPermission],
         {
            Pending: [], // limited
            ForReview: [], // full
            Done: [], // full
         }
      );

      for (const status in tasksByStatusObj) {
         if (tasksByStatusObj[status].length) {
            tasksByStatus.push(
               <TasksByStatusList key={status} status={status}>
                  {renderTasks(status, tasksByStatusObj[status])}
               </TasksByStatusList>
            );
         }
      }

      return tasksByStatus;
   }

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
