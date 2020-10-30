import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";
import actionSetter from "../../_helpers/actionSetter";

interface Props {
   taskId: string;
   taskCat: string;
}

const CommentsForm: React.FC<Props> = ({ taskId, taskCat }) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   const [comment, setComment] = useState("");
   const [hasSubmitted, setHasSubmitted] = useState(false);

   const payload = {
      taskId: taskId,
      taskCat: taskCat,
      commentAuthor: user,
      commentText: comment,
   };

   return <>{renderCommentForm()}</>;

   function renderCommentForm() {
      const cl = `c-commentForm ${comment ? "js-hasText" : ""}`;

      return (
         <div className={cl}>
            {renderTextArea()}
            {renderButton()}
         </div>
      );
   }

   function renderTextArea() {
      const placeholders = [
         "Thy thoughts, Chosen One?",
         "Scribe! Scribe! Scrrrriiibbbe!",
      ];

      // 10% chance to surprise
      const placeholder =
         Math.random() * 10 < 9
            ? "Comment goes here…"
            : placeholders[
                 Math.floor(Math.random() * placeholders.length)
              ];

      const cl = `c-commentForm__textarea ${
         hasSubmitted ? "js-hasSubmitted" : ""
      } ${comment ? "js-active" : ""}`;

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
         dispatch(actionSetter["addComment"](payload));
         setComment("");
         setHasSubmitted(true);
      }
   }

   function hUserInput(e) {
      setComment(e.target.value);
      setHasSubmitted(false);
   }
};

export default CommentsForm;
