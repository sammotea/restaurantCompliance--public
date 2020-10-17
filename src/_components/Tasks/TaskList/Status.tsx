import React from "react";
import Categories from "./Categories";

interface Props {
   tasks: iTask[];
   title: string;
}

const Status: React.FC<Props> = ({ tasks, title }) => {
   function renderStatus() {
      return (
         <li>
            <h1>{title}</h1>
            <Categories tasks={tasks} />
         </li>
      );
   }

   return <>{renderStatus()}</>;
};

export default Status;
