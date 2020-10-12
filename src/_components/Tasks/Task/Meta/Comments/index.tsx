import React, { useContext } from "react";
import User from "../../../../../_contexts/user";
import avatars from "../../../../../_misc/avatars";
import TasksDispatch from "../../../../../_contexts/tasksDispatch";
import taskHandlers from "../../../../../_helpers/taskHandlers";

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

   function hDelete(commentId) {
      taskHandlers.deleteComment(
         {
            // TODO, delete line after reducer refactor
            taskId: taskId,
            taskCat: taskCat,
            commentId: commentId,
         },
         dispatch
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

   function renderActions(id) {
      return (
         <ul className="c-comment__actions">
            <li
               className="c-comment__action c-comment__action--delete"
               onClick={() => hActionClick("delete", id)}
            ></li>
         </ul>
      );
   }

   function renderAvatar(author) {
      const avatar = avatars[author] ? avatars[author] : "robot";

      return (
         <div
            className={`c-comment__avatar c-comment__avatar--${avatar}`}
         ></div>
      );
   }

   function getComment(commentObj, index) {
      const { author, comment, id } = commentObj;
      const theirComment = user === author ? true : false;
      const canEdit = theirComment;

      return (
         <li key={index} className="c-comment">
            <div className="c-comment__meta">
               {renderAvatar(author)}
               <div className="c-comment__author">
                  {theirComment ? "You" : author} wrote:
               </div>
               {canEdit && renderActions(id)}
            </div>

            <div className="c-comment__text">{comment}</div>
         </li>
      );
   }

   function renderComments() {
      if (commentsArr.length) {
         return (
            <ul className="c-comments">
               {commentsArr.map(getComment)}
            </ul>
         );
      }
   }

   return <>{renderComments()}</>;
};

export default Comments;
