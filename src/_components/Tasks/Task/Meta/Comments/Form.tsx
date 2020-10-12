import React, { useState, useContext } from "react";
import User from "../../../../../_contexts/user";
import TasksDispatch from "../../../../../_contexts/tasksDispatch";
import taskHandlers from "../../../../../_helpers/taskHandlers";

interface Props {
   taskId: string;
   taskCat: string;
}

const Form: React.FC<Props> = ({ taskId, taskCat }) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   const [comment, setComment] = useState("");
   const [hasSubmitted, setHasSubmitted] = useState(false);

   function hButtonClick() {
      if (comment) {
         taskHandlers.addComment(
            {
               // TODO, delete line after reducer refactor
               taskId: taskId,
               taskCat: taskCat,
               commentAuthor: user,
               commentText: comment,
            },
            dispatch
         );
         setComment("");
         setHasSubmitted(true);
      }
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

   function renderFormTitle() {
      return <h1 className="c-commentForm__title">Leave a note…</h1>;
   }

   function hUserInput(e) {
      setComment(e.target.value);
      setHasSubmitted(false);
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

      return (
         <textarea
            className={
               "c-commentForm__textarea" +
               (hasSubmitted ? " hasSubmitted" : "")
            }
            placeholder={!comment ? placeholder : ""}
            onChange={hUserInput}
            value={comment}
         ></textarea>
      );
   }

   function renderCommentForm() {
      return (
         <div
            className={"c-commentForm" + (comment ? " hasText" : "")}
         >
            {renderFormTitle()}
            {renderTextArea()}
            {renderButton()}
         </div>
      );
   }
   return <>{renderCommentForm()}</>;
};

export default Form;
