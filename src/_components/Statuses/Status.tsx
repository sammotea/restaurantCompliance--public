import React from "react";

import Categories from "../Categories";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Status: React.FC<Props> = ({ tasksArr, title }) => {
   return <>{renderStatus()}</>;

   function renderStatus() {
      return (
         <li>
            <h1>{title}</h1>
            <Categories tasksArr={tasksArr} />
         </li>
      );
   }
};

export default Status;
