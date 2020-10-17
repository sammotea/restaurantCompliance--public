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

   function sortCategories(categoriesArr) {
      return [...categoriesArr].sort((a, b) => {
         const nameA = a.key.toUpperCase(),
            nameB = b.key.toUpperCase();

         if (nameA < nameB) return -1;
         if (nameA > nameB) return 1;
         return 0;
      });
   }

   function renderCategories() {
      const tasksByCategory = getTasksByCategory();
      const categories = Object.keys(tasksByCategory).map(
         (category) => {
            return (
               <Category
                  key={category}
                  title={category}
                  tasks={tasksByCategory[category]}
               />
            );
         }
      );
      return <ul>{sortCategories(categories)}</ul>;
   }

   return <>{renderCategories()}</>;
};

export default Categories;
