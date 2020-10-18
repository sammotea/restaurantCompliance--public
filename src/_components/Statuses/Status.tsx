import React from "react";

import camelcaseify from "../../_helpers/transforms";

import Categories from "../Categories";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Status: React.FC<Props> = ({ tasksArr, title }) => {
   return <>{renderStatus()}</>;

   function renderStatus() {
      const cl = `c-status c-status--${camelcaseify(title)}`;
      return (
         <li className={cl}>
            {renderTitle()}
            <Categories tasksArr={tasksArr} status={title} />
         </li>
      );
   }

   function renderTitle() {
      const cl = `c-status__title`;
      let titleText = "";

      switch (title) {
         case "incomplete":
            titleText = "Needs doing";
            break;

         case "awaitingReview":
            titleText = "Needs sign-off";
            break;

         case "complete":
            titleText = "Complete";
            break;
      }

      return <h1 className={cl}>{titleText}</h1>;
   }
};

export default Status;
