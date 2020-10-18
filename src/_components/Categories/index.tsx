import React from "react";

import organiseByCategory from "../../_reducers/organiseByCategory";
import sorters from "../../_helpers/sorters";
import camelcaseify from "../../_helpers/transforms";

import Category from "./Category";

interface Props {
   tasksArr: iTask[];
   status: string;
}

const Categories: React.FC<Props> = ({ tasksArr, status }) => {
   return <>{renderCategories()}</>;

   function renderCategories() {
      const cl = `c-categories c-categories--${camelcaseify(status)}`;
      const tasksByCategory = getTasksByCategory();
      const categories = Object.keys(tasksByCategory).map(
         (category) => {
            return (
               <Category
                  key={category}
                  title={category}
                  tasksArr={tasksByCategory[category]}
               />
            );
         }
      );
      return <ul className={cl}>{sorters.byKey(categories)}</ul>;
   }

   function getTasksByCategory() {
      return tasksArr.reduce(organiseByCategory, {});
   }
};

export default Categories;
