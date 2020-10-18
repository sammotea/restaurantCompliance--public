import React from "react";

import camelcaseify from "../../_helpers/transforms";

import Categories from "../Categories";

interface Props {
   tasksArr: iTask[];
   title: string;
}

const Status: React.FC<Props> = ({ tasksArr, title }) => {
   return <>{renderStatus()}</>;

   function renderStatus() {
      const cl = `c-status c-status--${camelcaseify(title)}`;
      return (
         <li className={cl}>
            <h1 className="c-status__title">{title}</h1>
            <Categories tasksArr={tasksArr} />
         </li>
      );
   }
};

export default Status;
