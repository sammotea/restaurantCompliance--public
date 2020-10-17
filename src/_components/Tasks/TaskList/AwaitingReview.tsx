import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import actionSetter from "../../../_helpers/actionSetter";
import Meta from "../Task/Meta";
import Toolbar from "../Task/Meta/Toolbar";
import Title from "../Task/Title";
import CommentsForm from "../Task/Meta/Comments/Form";
import Comments from "../Task/Meta/Comments";
import Worker from "../Task/Meta/Toolbar/Worker";
import Undo from "../Task/Meta/Toolbar/Undo";

interface Props extends iTask {}

const forReview: React.FC<Props> = ({
   title,
   category,
   compliance: { worker, status, comments = [] },
}) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   const compliancePayload = {
      taskId: title,
      taskCat: category,
      worker: worker,
      reviewer: user,
   };

   function hCompleteClick() {
      dispatch(actionSetter.complete(compliancePayload));
   }

   function hFixedClick() {
      dispatch(
         actionSetter.complete({
            ...compliancePayload,
            workerFlag: true,
         })
      );
   }

   function hFailedClick() {
      dispatch(actionSetter.fail(compliancePayload));
   }

   function hUndoClick() {
      dispatch(actionSetter.reset(compliancePayload));
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
      return (
         <Meta>
            {renderToolbar()}
            {renderCommentsForm()}
            {renderComments()}
         </Meta>
      );
   }

   function renderCommentsForm() {
      return <CommentsForm taskId={title} taskCat={category} />;
   }

   function renderComments() {
      if (comments.length) {
         return (
            <Comments
               comments={comments}
               taskId={title}
               taskCat={category}
            />
         );
      }
   }

   function renderToolbar() {
      return (
         <Toolbar>
            <Undo handler={hUndoClick} />
            <Worker name={worker} />
         </Toolbar>
      );
   }

   return (
      <>
         {renderTitle()}
         {renderTaskActions()}
         {renderMeta()}
      </>
   );
};

export default forReview;
