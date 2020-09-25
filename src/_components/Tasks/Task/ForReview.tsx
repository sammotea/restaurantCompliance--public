import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import taskHandlers from "../../../_helpers/taskHandlers";
import Task from "./";
import Title from "./Title";
import TaskMeta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import Worker from "./Meta/Toolbar/Worker";
import Undo from "./Meta/Toolbar/Undo";

interface Props extends iTask {}

const forReview: React.FC<Props> = ({
   title,
   type,
   compliance: { worker, status },
}) => {
   const user = useContext(User);
   const payload = {
      taskId: title,
      taskCat: type,
      worker: worker,
      reviewer: user,
   };

   function hCompleteClick() {
      taskHandlers.completeTask(payload);
   }

   function hFixedClick() {
      taskHandlers.completeTask({
         ...payload,
         flagWorker: true,
      });
   }

   function hFailedClick() {
      taskHandlers.failTask(payload);
   }

   function hUndoClick() {
      taskHandlers.resetTask(payload);
   }

   function renderTitle() {
      return <Title title={title} />;
   }

   function getTaskActions(actions) {
      const taskActions: JSX.Element[] = [];

      actions.forEach((action) => {
         let handler;

         switch (action) {
            case "reviewed":
               handler = hCompleteClick;
               break;

            case "fixed":
               handler = hFixedClick;
               break;

            case "failed":
               handler = hFailedClick;
               break;

            default:
               throw new Error();
               break;
         }

         taskActions.push(
            <li
               key={action}
               className={`c-task__action  c-task__action--${action}`}
               onClick={handler}
            ></li>
         );
      });

      return taskActions;
   }

   function renderTaskActions() {
      let actions = ["reviewed", "fixed", "failed"];

      // Remove ‘fixed’ option if already flagged
      if (status === "blocked")
         actions = actions.filter((item) => item !== "fixed");

      return (
         <ul className={`c-task__actions c-${status}Task__actions`}>
            {getTaskActions(actions)}
         </ul>
      );
   }

   function renderMeta() {
      return <TaskMeta>{renderToolbar()}</TaskMeta>;
   }

   function renderToolbar() {
      return (
         <Toolbar>
            <Undo handler={hUndoClick} />
            <Worker name={worker} />
         </Toolbar>
      );
   }

   function renderTask() {
      return (
         <Task title={title} status={status}>
            {renderTitle()}
            {renderTaskActions()}
            {renderMeta()}
         </Task>
      );
   }

   return <>{renderTask()}</>;
};

export default forReview;
