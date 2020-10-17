import React from "react";
import Tasks from "../Tasks";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Category: React.FC<Props> = ({ tasksArr, title }) => {
   return <>{renderCategory()}</>;

   function renderCategory() {
      return (
         <li>
            <h1>{title}</h1>
            <Tasks tasksArr={tasksArr} />
         </li>
      );
   }
};

export default Category;
