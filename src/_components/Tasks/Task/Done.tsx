import React, { useState, useContext } from "react";
import User from "../../../_contexts/user";
import taskHandlers from "../../../_helpers/taskHandlers";
import Task from "./";
import Title from "./Title";
import TaskMeta from "./Meta";
import Toolbar from "./Meta/Toolbar";
import Worker from "./Meta/Toolbar/Worker";
import Reviewer from "./Meta/Toolbar/Reviewer";
import Undo from "./Meta/Toolbar/Undo";

const Done: React.FC<iTask> = ({
   title,
   type,
   compliance: { worker, reviewer, status },
}) => {
   const user = useContext(User);
   const payload = {
      taskId: title,
      taskCat: type,
      worker: worker,
      reviewer: user,
   };

   function hUndoClick() {
      if (worker === reviewer) {
         taskHandlers.resetTask(payload);
      } else {
         taskHandlers.markTaskForReview(payload);
      }
   }

   function renderTitle() {
      return <Title title={title} />;
   }

   function renderMeta() {
      return <TaskMeta>{renderToolbar()}</TaskMeta>;
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

   function renderTask() {
      const cl = "c-doneTask c-doneTask--" + status;
      return (
         <Task title={title} status={status}>
            {renderTitle()}
            {renderMeta()}
         </Task>
      );
   }

   return <>{renderTask()}</>;
};

export default Done;
