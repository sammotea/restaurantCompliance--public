import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import Permission from "../../../_contexts/permission";
import actionSetter from "../../../_helpers/actionSetter";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import Meta from "../Task/Meta";
import Toolbar from "../Task/Meta/Toolbar";
import ReportProblem from "../Task/Meta/Toolbar/ReportProblem";
import Subtasks from "../Task/Meta/Subtasks";
import Title from "../Task/Title";

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

   return (
      <>
         {renderTitle()}
         {renderMeta()}
      </>
   );
};

export default Incomplete;
