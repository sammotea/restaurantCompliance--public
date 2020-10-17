import React, { useState, useContext } from "react";

import User from "../../../_contexts/user";
import Permission from "../../../_contexts/permission";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import actionSetter from "../../../_helpers/actionSetter";

import Title from "./Title";
import Meta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import ReportProblem from "./Meta/Toolbar/ReportProblem";
import Subtasks from "./Meta/Subtasks";

const Incomplete: React.FC<iTask> = ({
   title,
   subtasks = [],
   compliance: { status },
   category,
}) => {
   const user = useContext(User);
   const hasPermission = useContext(Permission);
   const dispatch = useContext(TasksDispatch);

   const userCanReview = hasPermission;
   const isFresh = status === "incomplete";

   const compliancePayload = {
      taskId: title,
      taskCat: category,
      worker: user,
      reviewer: undefined,
   };

   if (userCanReview) {
      compliancePayload.reviewer = user;
   }

   return (
      <>
         {renderTitle()}
         {renderMeta()}
      </>
   );

   function renderTitle() {
      return <Title title={title} handler={hTitleClick} />;
   }

   function renderMeta() {
      return (
         <Meta>
            {renderToolbar()}
            {renderSubtasks()}
         </Meta>
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
      if (subtasks.length) {
         return <Subtasks tasks={subtasks} />;
      }
   }

   function hTitleClick() {
      if (!isFresh) {
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
};

export default Incomplete;
