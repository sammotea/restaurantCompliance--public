import React from "react";
import organiseByCategory from "../../../_reducers/organiseByCategory";
import Category from "./Category";

interface Props {
   tasks: iTask[];
}

const Categories: React.FC<Props> = ({ tasks }) => {
   function getTasksByCategory() {
      return tasks.reduce(organiseByCategory, {});
   }

   function renderCategories() {
      const tasksByCategory = getTasksByCategory();

      return (
         <ul>
            {Object.keys(tasksByCategory).map((category) => {
               return (
                  <Category
                     key={category}
                     title={category}
                     tasks={tasksByCategory[category]}
                  />
               );
            })}
         </ul>
      );
   }

   return <>{renderCategories()}</>;
};

export default Categories;
