import React from "react";

interface Props {
   name: string;
}

const Worker: React.FC<Props> = ({ name }) => {
   return (
      <>
         <li className="c-toolbar__item c-toolbar__item--worker">
            {name}
         </li>
      </>
   );
};

export default Worker;
