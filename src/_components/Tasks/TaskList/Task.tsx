import React, { useContext } from "react";
import Permission from "../../../_contexts/permission";
import Incomplete from "./Incomplete";
import AwaitingReview from "./AwaitingReview";
import Complete from "./Complete";

interface Props {
   task: iTask;
}

const Task: React.FC<Props> = ({ task }) => {
   const hasPermission = useContext(Permission);
   const status = task.compliance.status;

   function renderTask() {
      const cl = `c-task c-task--${status}`;
      let el;

      if (hasPermission) {
         switch (status) {
            case "incomplete":
               el = <Incomplete {...task} />;
               break;

            case "awaitingReview":
            case "blocked":
               el = <AwaitingReview {...task} />;
               break;

            case "complete":
            case "failed":
               el = <Complete {...task} />;
               break;
         }
      } else {
         el = <Incomplete {...task} />;
      }

      return <li className={cl}>{el}</li>;
   }

   return <>{renderTask()}</>;
};

export default Task;
