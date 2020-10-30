import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";
import avatars from "../../_misc/avatars";
import camelcaseify from "../../_helpers/transforms";
import actionSetter from "../../_helpers/actionSetter";

interface Props {
   comments: any;
   taskId: string;
   taskCat: string;
}

const Comments: React.FC<Props> = ({
   comments: commentsArr,
   taskId,
   taskCat,
}) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   const payload = {
      taskId: taskId,
      taskCat: taskCat,
   };

   return <>{renderComments()}</>;

   function renderComments() {
      if (commentsArr.length) {
         return (
            <ul className="c-comments">
               {commentsArr.map(getComment)}
            </ul>
         );
      }
   }

   function getComment(commentObj, index) {
      const { author, comment, id } = commentObj;
      const theirComment = user === author ? true : false;
      const canEdit = theirComment;

      return (
         <li key={index} className="c-comment">
            {renderAvatar(author)}
            <div className="c-comment__author">
               {theirComment ? "You" : author} wrote:
            </div>

            <div className="c-comment__text">{comment}</div>

            {canEdit && renderActions(id)}
         </li>
      );
   }

   function renderAvatar(author) {
      const avatar = avatars[author] ? avatars[author] : "robot";
      const cl = `c-comment__avatar c-comment__avatar--${camelcaseify(
         avatar
      )}`;

      return <div className={cl}></div>;
   }

   function renderActions(id) {
      return (
         <ul className="c-comment__actions">
            <li
               className="c-comment__action c-comment__action--delete"
               onClick={() => hActionClick("delete", id)}
            >
               Delete
            </li>
         </ul>
      );
   }

   function hDelete(commentId) {
      dispatch(
         actionSetter.deleteComment({
            ...payload,
            commentId: commentId,
         })
      );
   }

   function hActionClick(actionType, commentId) {
      switch (actionType) {
         case "delete":
            hDelete(commentId);
            break;

         default:
            break;
      }
   }
};

export default Comments;
