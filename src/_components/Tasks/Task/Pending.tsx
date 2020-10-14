import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import actionSetter from "../../../_helpers/actionSetter";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import Task from "./";
import Meta from "./Meta";
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
   const dispatch = useContext(TasksDispatch);

   const userCanReview = user === "manager";
   const isPending = status === "pending";
   const compliancePayload = {
      taskId: title,
      taskCat: type,
      worker: user,
      reviewer: undefined,
   };

   if (userCanReview) {
      compliancePayload.reviewer = user;
   }

   function hTitleClick() {
      if (!isPending) {
         dispatch(actionSetter.reset(compliancePayload));
      } else {
         if (userCanReview) {
            dispatch(actionSetter.complete(compliancePayload));
         } else {
            dispatch(actionSetter.forReview(compliancePayload));
         }
      }
   }

   function hReportProblemClick() {
      if (userCanReview) {
         dispatch(actionSetter.fail(compliancePayload));
      } else {
         dispatch(
            actionSetter.forReview({
               ...compliancePayload,
               isBlocked: true,
            })
         );
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
         <Meta>
            {renderToolbar()}
            {renderSubtasks()}
         </Meta>
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
