import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import taskHandlers from "../../../_helpers/taskHandlers";
import TaskMeta from "../TaskMeta";
import Toolbar from "../TaskMeta/MetaToolbar";
import ReportProblem from "../TaskMeta/MetaToolbar/ReportProblem";
import Subtasks from "../TaskMeta/Subtasks";

const Pending: React.FC<iTask> = ({
   title,
   subtasks = [],
   compliance: { status, worker },
   type,
}) => {
   const user = useContext(User);

   const userCanReview = user === "manager";
   const isPending = status === "pending";
   const payload = {
      taskId: title,
      taskCat: type,
      worker: user,
      reviewer: undefined,
   };

   if (userCanReview) {
      payload.reviewer = user;
   }

   function hTitleClick() {
      if (!isPending) {
         taskHandlers.resetTask(payload);
      } else {
         if (userCanReview) {
            taskHandlers.completeTask(payload);
         } else {
            taskHandlers.markTaskForReview(payload);
         }
      }
   }

   function hReportProblemClick() {
      if (userCanReview) {
         taskHandlers.failTask(payload);
      } else {
         taskHandlers.markTaskForReview({
            ...payload,
            isBlocked: true,
         });
      }
   }

   function renderTitle() {
      return (
         <h1 className="c-pendingTask__title" onClick={hTitleClick}>
            {title}
         </h1>
      );
   }

   function renderToolbar() {
      return (
         <Toolbar>
            <ReportProblem handler={hReportProblemClick} />
         </Toolbar>
      );
   }

   function renderSubtasks() {
      return <Subtasks tasks={subtasks} />;
   }

   function renderMeta() {
      return (
         <TaskMeta parent="pendingTask">
            {renderToolbar()}
            {renderSubtasks()}
         </TaskMeta>
      );
   }

   function renderTask() {
      const cl = "c-pendingTask c-pendingTask--" + status;

      return (
         <li className={cl}>
            {renderTitle()}
            {renderMeta()}
         </li>
      );
   }

   return <>{renderTask()}</>;
};

export default Pending;
