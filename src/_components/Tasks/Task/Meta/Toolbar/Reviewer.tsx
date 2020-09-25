import React from "react";

interface Props {
   name: string;
}

const Reviewer: React.FC<Props> = ({ name }) => {
   return (
      <>
         <li className="c-toolbar__item c-toolbar__item--reviewer">
            {name}
         </li>
      </>
   );
};

export default Reviewer;
