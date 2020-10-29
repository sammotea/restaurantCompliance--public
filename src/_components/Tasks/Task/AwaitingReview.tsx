import React, { useContext } from "react";

import User from "../../../_contexts/user";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import actionSetter from "../../../_helpers/actionSetter";
import camelcaseify from "../../../_helpers/transforms";

import Title from "./Title";
import Meta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import Worker from "./Meta/Toolbar/Worker";
import Undo from "./Meta/Toolbar/Undo";
import Comments from "./Meta/Comments";
import CommentsForm from "./Meta/Comments/Form";

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

   return (
      <>
         {renderTitle()}
         {renderTaskActions()}
         {renderMeta()}
      </>
   );

   function renderTitle() {
      return <Title title={title} />;
   }

   function renderTaskActions() {
      let actions = ["reviewed", "fixed", "failed"];

      // Remove ‘fixed’ option if already flagged
      if (status === "blocked")
         actions = actions.filter((item) => item !== "fixed");

      return (
         <ul className={`c-task__actions`}>
            {getTaskActions(actions)}
         </ul>
      );
   }

   function getTaskActions(actions) {
      const taskActions: JSX.Element[] = [];

      actions.forEach((action) => {
         let handler;
         const cl = `c-task__action  c-task__action--${camelcaseify(
            action
         )}`;

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
            <li key={action} className={cl} onClick={handler}></li>
         );
      });

      return taskActions;
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

   function renderToolbar() {
      return (
         <Toolbar>
            <Undo handler={hUndoClick} />
            <Worker name={worker} />
         </Toolbar>
      );
   }

   function renderCommentsForm() {
      return <CommentsForm taskId={title} taskCat={category} />;
   }

   function renderComments() {
      return (
         <Comments
            comments={comments}
            taskId={title}
            taskCat={category}
         />
      );
   }

   function hCompleteClick() {
      dispatch(actionSetter.complete(compliancePayload));
   }

   function hFixedClick() {
      dispatch(
         actionSetter.complete({
            ...compliancePayload,
            isFixed: true,
         })
      );
   }

   function hFailedClick() {
      dispatch(actionSetter.fail(compliancePayload));
   }

   function hUndoClick() {
      dispatch(actionSetter.reset(compliancePayload));
   }
};

export default forReview;
