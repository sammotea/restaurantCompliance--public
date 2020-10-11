import React, { useContext } from "react";
import User from "../../../../../_contexts/user";
import avatars from "../../../../../_misc/avatars";

interface Props {
   comments: any;
   hDelete: any;
}

const Comments: React.FC<Props> = ({
   comments: commentsArr,
   hDelete,
}) => {
   const user = useContext(User);

   function renderActions(id) {
      return (
         <ul className="c-comment__actions">
            {/* <li className="c-comment__action c-comment__action--edit"></li> */}
            <li
               className="c-comment__action c-comment__action--delete"
               onClick={() => hDelete(id)}
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
