import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import taskHandlers from "../../../_helpers/taskHandlers";
import Task from "./";
import Title from "./Title";
import Meta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import CommentsForm from "./Meta/Comments/Form";
import Comments from "./Meta/Comments";
import Worker from "./Meta/Toolbar/Worker";
import Reviewer from "./Meta/Toolbar/Reviewer";
import Undo from "./Meta/Toolbar/Undo";

const Done: React.FC<iTask> = ({
   title,
   type,
   compliance: { worker, reviewer, status, comments = [] },
}) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);
   const payload = {
      taskId: title,
      taskCat: type,
      worker: worker,
      reviewer: user,
   };

   function hUndoClick() {
      if (worker === reviewer) {
         taskHandlers.resetTask(payload, dispatch);
      } else {
         taskHandlers.markTaskForReview(payload, dispatch);
      }
   }

   function hCommentSubmit(commentText) {
      taskHandlers.addComment(
         {
            ...payload,
            commentAuthor: user,
            commentText: commentText,
         },
         dispatch
      );
   }

   function hCommentDelete(commentId) {
      taskHandlers.deleteComment(
         {
            ...payload,
            commentId: commentId,
         },
         dispatch
      );
   }

   function renderTitle() {
      return <Title title={title} />;
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
      return <CommentsForm hSubmit={hCommentSubmit} />;
   }

   function renderComments() {
      if (comments.length) {
         return (
            <Comments comments={comments} hDelete={hCommentDelete} />
         );
      }
   }

   function renderToolbar() {
      return (
         <Toolbar>
            <Undo handler={hUndoClick} />
            <Worker name={worker} />
            <Reviewer name={reviewer} />
         </Toolbar>
      );
   }

   function renderTask() {
      const cl = "c-doneTask c-doneTask--" + status;
      return (
         <Task title={title} status={status}>
            {renderTitle()}
            {renderMeta()}
         </Task>
      );
   }

   return <>{renderTask()}</>;
};

export default Done;
