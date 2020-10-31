import React, { useState, useContext } from "react";

import transformers from "../../../utils/transformers";
import CurrentView from "../../../contexts/currentVIew";
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
               <span className="c-category__count">
                  {" "}
                  ({getNumberOutstandingTasks()})
               </span>
            </h1>
            <Tasks tasksArr={tasksArr} />
         </li>
      );
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
      let tasks = 0;
      tasksArr.forEach((task) => {
         if (task.compliance.status === currentView) tasks++;
      });

      return tasks ? tasks.toString() : "-";
   }

   function hTitleClick() {
      setIsVisible(!isVisible);
   }
};

export default Category;
