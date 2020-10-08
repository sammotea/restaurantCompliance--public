import React, { useContext } from "react";
import User from "../../../../../_contexts/user";

interface Props {
   comments: any;
}

const Comments: React.FC<Props> = ({ comments: commentsArr }) => {
   const user = useContext(User);

   function renderActions() {
      return (
         <ul className="c-comment__actions">
            <li className="c-comment__action c-comment__action--edit"></li>
            <li className="c-comment__action c-comment__action--delete"></li>
         </ul>
      );
   }

   function getComments() {
      return commentsArr.map((commentObj, index) => {
         const { author, comment } = commentObj;
         const theirComment = user === author ? true : false;
         const canEdit = theirComment;

         return (
            <li
               key={index}
               className={`c-comment c-comment--${Math.ceil(
                  Math.random() * 10
               )}`}
            >
               <div className={`c-comment__meta`}>
                  <div className="c-comment__author">
                     {theirComment ? "You" : author}
                  </div>
                  {canEdit && renderActions()}
               </div>

               <div className="c-comment__text">{comment}</div>
            </li>
         );
      });
   }

   function renderComments() {
      if (commentsArr.length) {
         return <ul className="c-comments">{getComments()}</ul>;
      }
   }

   return <>{renderComments()}</>;
};

export default Comments;
