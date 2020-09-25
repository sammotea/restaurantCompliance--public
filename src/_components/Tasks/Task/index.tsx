import React from "react";

interface Props {
   title: string;
   status: string;
}

const Task: React.FC<Props> = ({ title, status, children }) => {
   const cl = `c-task c-task--${status} c-${status}Task`;

   return (
      <li key={title} className={cl}>
         {children}
      </li>
   );
};

export default Task;
