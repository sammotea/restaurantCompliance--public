import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";

interface Props extends iTask {}

const Toreview: React.FC<Props> = ({
   title,
   type,
   compliance: { worker, status },
}) => {
   const [showDetails, setShowDetails] = useState(false);
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   function handleCompleted() {
      console.log("COMPLETE");
      dispatch({
         type: "COMPLETE",
         payload: {
            taskId: title,
            taskCat: type,
            worker: user,
            reviewer: user,
         },
      });
   }

   function handleFixed() {
      dispatch({
         type: "COMPLETE",
         payload: {
            taskId: title,
            taskCat: type,
            worker: user,
            reviewer: user,
            flagWorker: true,
         },
      });
   }

   function handleFailed() {
      dispatch({
         type: "FAILED",
         payload: {
            taskId: title,
            taskCat: type,
            worker: user,
            reviewer: user,
         },
      });
   }

   function toggleDetails(e: React.MouseEvent) {
      setShowDetails(!showDetails);
   }

   function renderTitle() {
      return (
         <h1
            className="[ c-toreview__title ]"
            onClick={toggleDetails}
         >
            {title}
         </h1>
      );
   }

   function renderReviewOptions() {
      const reviewOptions: JSX.Element[] = [];
      let options = ["reviewed", "fixed", "failed"];

      if (status === "blocked")
         options = options.filter((item) => item !== "fixed");

      console.log(options);

      options.forEach((option) => {
         console.log(option);
         let handler;

         switch (option) {
            case "reviewed":
               handler = handleCompleted;
               break;

            case "fixed":
               handler = handleFixed;
               break;

            case "failed":
               handler = handleFailed;
               break;

            default:
               throw new Error();
               break;
         }
         reviewOptions.push(
            <li
               key={option}
               className={
                  "c-toreview__option c-toreview__option--" + option
               }
               onClick={handler}
            ></li>
         );
      });

      return <ul className="c-toreview__options">{reviewOptions}</ul>;
   }

   function renderDetails() {
      const reviewDetails: JSX.Element[] = [];

      ["worker"].forEach((option) => {
         let el = "";

         switch (option) {
            case "worker":
               el = worker;
               break;
         }

         reviewDetails.push(
            <li
               key={option}
               className={
                  "c-toreview__detail c-toreview__detail--" + option
               }
            >
               {el}
            </li>
         );
      });

      return <ul className="c-toreview__details">{reviewDetails}</ul>;
   }
   function renderDetailsToggle() {
      return (
         <span
            className="[ c-toreview__toggle ]"
            onClick={toggleDetails}
         ></span>
      );
   }
   function renderToreview() {
      if (title) {
         let toreviewClassName = "c-toreview";

         if (showDetails) toreviewClassName += " js-show ";
         if (status === "blocked")
            toreviewClassName += " c-toreview--hasProblem ";

         return (
            <li key={title} className={toreviewClassName}>
               {renderTitle()}
               {renderDetailsToggle()}
               {renderReviewOptions()}
               {renderDetails()}
            </li>
         );
      }
   }

   return <>{renderToreview()}</>;
};

export default Toreview;
