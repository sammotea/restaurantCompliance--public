import React from "react";

interface Props {
   name: string;
}

const Worker: React.FC<Props> = ({ name }) => {
   const cl = "c-toolbar__item c-toolbar__item--worker";

   return (
      <>
         <li className={cl}>{name}</li>
      </>
   );
};

export default Worker;
