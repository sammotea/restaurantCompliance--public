import React, { useContext } from "react";

import User from "../../../_contexts/user";
import TasksDispatch from "../../../_contexts/tasksDispatch";
import actionSetter from "../../../_helpers/actionSetter";

import Title from "./Title";
import Meta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import Worker from "./Meta/Toolbar/Worker";
import Reviewer from "./Meta/Toolbar/Reviewer";
import Undo from "./Meta/Toolbar/Undo";
import CommentsForm from "./Meta/Comments/Form";
import Comments from "./Meta/Comments";

const Complete: React.FC<iTask> = ({
   title,
   category,
   compliance: { worker, reviewer, comments = [] },
}) => {
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   const compliancePayload = {
      taskId: title,
      taskCat: category,
      worker: worker,
      reviewer: user,
   };

   return (
      <>
         {renderTitle()}
         {renderMeta()}
      </>
   );

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

   function renderToolbar() {
      return (
         <Toolbar>
            <Undo handler={hUndoClick} />
            <Worker name={worker} />
            <Reviewer name={reviewer} />
         </Toolbar>
      );
   }

   function renderCommentsForm() {
      return <CommentsForm taskId={title} taskCat={category} />;
   }

   function renderComments() {
      return (
         <Comments
            comments={comments}
            taskId={title}
            taskCat={category}
         />
      );
   }

   function hUndoClick() {
      if (worker === reviewer) {
         dispatch(actionSetter.reset(compliancePayload));
      } else {
         dispatch(actionSetter.forReview(compliancePayload));
      }
   }
};

export default Complete;
