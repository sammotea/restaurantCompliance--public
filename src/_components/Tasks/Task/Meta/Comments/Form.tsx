import React, { useState, useContext } from "react";

import User from "../../../../../_contexts/user";
import TasksDispatch from "../../../../../_contexts/tasksDispatch";
import actionSetter from "../../../../../_helpers/actionSetter";

interface Props {
   taskId: string;
   taskCat: string;
}

const Form: React.FC<Props> = ({ taskId, taskCat }) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   const [comment, setComment] = useState("");
   const [hasSubmitted, setHasSubmitted] = useState(false);

   const compliancePayload = {
      taskId: taskId,
      taskCat: taskCat,
      commentAuthor: user,
      commentText: comment,
   };

   return <>{renderCommentForm()}</>;

   function renderCommentForm() {
      const cl = "c-commentForm" + (comment ? " hasText" : "");

      return (
         <div className={cl}>
            {renderFormTitle()}
            {renderTextArea()}
            {renderButton()}
         </div>
      );
   }

   function renderFormTitle() {
      return <h1 className="c-commentForm__title">Leave a note…</h1>;
   }

   function renderTextArea() {
      const placeholders = [
         "Thou art the chosen one. Speak…",
         "Aeons, verily, didst we await thy word. Write…",
         "Draw forth thy insight. Release…",
         "Avast, foul demon! Avast! Nah, go on.",
      ];

      // 10% chance to surprise
      const placeholder =
         Math.random() * 10 < 9
            ? "Comment here"
            : placeholders[
                 Math.floor(Math.random() * placeholders.length)
              ];

      const cl =
         "c-commentForm__textarea" +
         (hasSubmitted ? " hasSubmitted" : "");

      return (
         <textarea
            className={cl}
            placeholder={!comment ? placeholder : ""}
            onChange={hUserInput}
            value={comment}
         ></textarea>
      );
   }

   function renderButton() {
      return (
         <div
            className="c-commentForm__buttonWrap"
            onClick={hButtonClick}
         >
            <span className="c-commentForm__button">Confirm!</span>
         </div>
      );
   }

   function hButtonClick() {
      if (comment) {
         dispatch(actionSetter.addComment(compliancePayload));
         setComment("");
         setHasSubmitted(true);
      }
   }

   function hUserInput(e) {
      setComment(e.target.value);
      setHasSubmitted(false);
   }
};

export default Form;
