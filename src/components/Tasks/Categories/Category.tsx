import React, { useState, useContext } from "react";

import transformers from "../../../utils/transformers";
import CurrentView from "../../../contexts/currentView";
import Tasks from "../index";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Category: React.FC<Props> = ({ tasksArr, title }) => {
   const [isVisible, setIsVisible] = useState(true);
   const currentView = useContext(CurrentView);

   return <>{renderCategory()}</>;

   function renderCategory() {
      const cl = `c-category c-category--${transformers.toCamel(
         title
      )} ${isVisible ? "s--isVisible" : ""}`;

      return (
         <li className={cl}>
            <h1 className="c-category__title" onClick={hTitleClick}>
               {getTitle()}
               {renderCategoryCount()}
            </h1>
            <Tasks tasksArr={tasksArr} />
         </li>
      );
   }

   function renderCategoryCount() {
      if (currentView !== "complete") {
         return (
            <span className="c-category__count">
               {" "}
               ({getNumberOutstandingTasks()})
            </span>
         );
      }
   }
   function getTitle(): string {
      let t = title;

      switch (title) {
         default:
            t = `The ${title}`;
      }

      return t;
   }

   function getNumberOutstandingTasks(): string {
      let numTasks = 0;
      tasksArr.forEach((task) => {
         if (task.compliance.status === currentView) numTasks++;
      });

      return numTasks ? numTasks.toString() : "-";
   }

   function hTitleClick() {
      setIsVisible(!isVisible);
   }
};

export default Category;
