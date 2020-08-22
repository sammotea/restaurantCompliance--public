import React from "react";
import Category from "./Category";

const Categories: React.FC<iTaskMeta> = ({ tasksByCategory }) => {
  console.log(tasksByCategory);

  const categories: JSX.Element[] = [];

  for (const category in tasksByCategory) {
    categories.push(
      <Category
        key={category}
        name={category}
        tasks={tasksByCategory[category]}
      />
    );
  }

  function renderCategories() {
    if (categories.length) {
      return <ul className="[ c-categories ]">{categories}</ul>;
    }
  }

  return <>{renderCategories()}</>;
};

export default Categories;
