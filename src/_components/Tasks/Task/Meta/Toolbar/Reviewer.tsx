import React from "react";

interface Props {
   name: string;
}

const Reviewer: React.FC<Props> = ({ name }) => {
   const cl = "c-toolbar__item c-toolbar__item--reviewer";

   return (
      <>
         <li className={cl}>{name}</li>
      </>
   );
};

export default Reviewer;
