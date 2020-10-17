import React from "react";
import Tasks from "./Tasks";

interface Props {
   tasks: iTask[];
   title: string;
}

const Category: React.FC<Props> = ({ tasks, title }) => {
   function renderCategory() {
      return (
         <li>
            <h1>{title}</h1>
            <Tasks tasks={tasks} />
         </li>
      );
   }

   return <>{renderCategory()}</>;
};

export default Category;
