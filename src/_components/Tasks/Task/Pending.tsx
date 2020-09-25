import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import taskHandlers from "../../../_helpers/taskHandlers";
import Task from "./";
import TaskMeta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import ReportProblem from "./Meta/Toolbar/ReportProblem";
import Subtasks from "./Meta/Subtasks";
import Title from "./Title";

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
      return <Title title={title} handler={hTitleClick} />;
   }

   function renderToolbar() {
      return (
         <Toolbar>
            <ReportProblem handler={hReportProblemClick} />
         </Toolbar>
      );
   }

   function renderSubtasks() {
      if (subtasks.length) {
         return <Subtasks tasks={subtasks} />;
      }
   }

   function renderMeta() {
      return (
         <TaskMeta>
            {renderToolbar()}
            {renderSubtasks()}
         </TaskMeta>
      );
   }

   function renderTask() {
      return (
         <Task title={title} status={status}>
            {renderTitle()}
            {renderMeta()}
         </Task>
      );
   }

   return <>{renderTask()}</>;
};

export default Pending;
