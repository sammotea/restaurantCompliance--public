import React, { useState, useContext } from "react";
import User from "../../_contexts/user";
import TasksDispatch from "../../_contexts/tasksDispatch";

interface Props extends iTask {}

const forReview: React.FC<Props> = ({
   title,
   type,
   compliance: { worker, status },
}) => {
   const [showDetails, setShowDetails] = useState(false);
   const user = useContext(User);
   const dispatch = useContext(TasksDispatch);

   function handleCompleted() {
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
            className="[ c-forReview__title ]"
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

      options.forEach((option) => {
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
                  "c-forReview__option c-forReview__option--" + option
               }
               onClick={handler}
            ></li>
         );
      });

      return (
         <ul className="c-forReview__options">{reviewOptions}</ul>
      );
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
                  "c-forReview__detail c-forReview__detail--" + option
               }
            >
               {el}
            </li>
         );
      });

      return (
         <ul className="c-forReview__details">{reviewDetails}</ul>
      );
   }
   function renderDetailsToggle() {
      return (
         <span
            className="[ c-forReview__detailToggle ]"
            onClick={toggleDetails}
         ></span>
      );
   }
   function renderforReview() {
      if (title) {
         let forReviewClassName = "c-forReview";

         if (showDetails) forReviewClassName += " js-show ";
         if (status === "blocked")
            forReviewClassName += " c-forReview--isBlocked ";

         return (
            <li key={title} className={forReviewClassName}>
               {renderTitle()}
               {renderDetailsToggle()}
               {renderReviewOptions()}
               {renderDetails()}
            </li>
         );
      }
   }

   return <>{renderforReview()}</>;
};

export default forReview;
