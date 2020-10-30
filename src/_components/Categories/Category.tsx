import React, { useState, useContext } from "react";

import camelcaseify from "../../_helpers/transforms";
import CurrentView from "../../_contexts/currentVIew";
import Tasks from "../Tasks";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Category: React.FC<Props> = ({ tasksArr, title }) => {
   const [isVisible, setIsVisible] = useState(true);
   const currentView = useContext(CurrentView);

   return <>{renderCategory()}</>;

   function renderCategory() {
      const cl = `c-category c-category--${camelcaseify(title)} ${
         isVisible ? "js-isVisible" : ""
      }`;

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

   function getTitle() {
      let t = title;

      switch (title) {
         default:
            t = `The ${title}`;
      }

      return t;
   }

   function getNumberOutstandingTasks() {
      let tasks = 0;
      tasksArr.forEach((task) => {
         if (task.compliance.status === currentView) tasks++;
      });

      return tasks ? tasks : "-";
   }

   function hTitleClick() {
      setIsVisible(!isVisible);
   }
};

export default Category;
