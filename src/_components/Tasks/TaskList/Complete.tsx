import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import actionSetter from "../../../_helpers/actionSetter";
import Title from "../Task/Title";
import Meta from "../Task/Meta";
import Toolbar from "../Task/Meta/Toolbar";
import CommentsForm from "../Task/Meta/Comments/Form";
import Comments from "../Task/Meta/Comments";
import Worker from "../Task/Meta/Toolbar/Worker";
import Reviewer from "../Task/Meta/Toolbar/Reviewer";
import Undo from "../Task/Meta/Toolbar/Undo";

const Complete: React.FC<iTask> = ({
   title,
   category,
   compliance: { worker, reviewer, status, comments = [] },
}) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);
   const compliancePayload = {
      taskId: title,
      taskCat: category,
      worker: worker,
      reviewer: user,
   };

   function hUndoClick() {
      if (worker === reviewer) {
         dispatch(actionSetter.reset(compliancePayload));
      } else {
         dispatch(actionSetter.forReview(compliancePayload));
      }
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
      return <CommentsForm taskId={title} taskCat={category} />;
   }

   function renderComments() {
      if (comments.length) {
         return (
            <Comments
               comments={comments}
               taskId={title}
               taskCat={category}
            />
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

   return (
      <>
         {renderTitle()}
         {renderMeta()}
      </>
   );
};

export default Complete;
