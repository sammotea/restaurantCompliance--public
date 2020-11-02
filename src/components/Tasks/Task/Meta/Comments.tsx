import React, { useContext } from "react";
import User from "../../../../contexts/user";
import Dispatch from "../../../../contexts/dispatch";
import avatars from "../../../../maps/avatars";
import transformers from "../../../../utils/transformers";
import compliance from "../../../../utils/compliance";

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
   const dispatch = useContext(Dispatch);

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

   function getComment(commentObj: iCommentsObj, index: number) {
      const { author, comment, id } = commentObj;
      console.log(id);
      const theirComment = user === author ? true : false;
      const canEdit = theirComment;

      return (
         <li key={id} className="c-comment">
            {renderAvatar(author)}
            <div className="c-comment__author">
               {theirComment ? "You" : author} wrote:
            </div>

            <div className="c-comment__text">{comment}</div>

            {canEdit && renderActions(id)}
         </li>
      );
   }

   function renderAvatar(author: string) {
      const avatar = avatars[author] ? avatars[author] : "robot";
      const cl = `c-comment__avatar c-comment__avatar--${transformers.toCamel(
         avatar
      )}`;

      return <div className={cl}></div>;
   }

   function renderActions(commentId: number) {
      return (
         <ul className="c-comment__actions">
            <li
               className="c-comment__action c-comment__action--delete"
               onClick={() => hActionClick("delete", commentId)}
            >
               Delete
            </li>
         </ul>
      );
   }

   function hDelete(commentId: number) {
      const payload = {
         taskId: taskId,
         taskCat: taskCat,
         commentId: commentId,
      } as iCommentRemovalPayload;
      console.log(payload);
      dispatch(compliance.setAction.deleteComment(payload));
   }

   function hActionClick(actionType: string, commentId: number) {
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
