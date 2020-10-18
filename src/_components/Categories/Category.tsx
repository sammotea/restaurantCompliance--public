import React from "react";

import camelcaseify from "../../_helpers/transforms";

import Tasks from "../Tasks";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Category: React.FC<Props> = ({ tasksArr, title }) => {
   return <>{renderCategory()}</>;

   function renderCategory() {
      const cl = `c-category c-category--${camelcaseify(title)}`;

      return (
         <li className={cl}>
            <h1 className="c-category__title">{title}</h1>
            <Tasks tasksArr={tasksArr} />
         </li>
      );
   }
};

export default Category;
