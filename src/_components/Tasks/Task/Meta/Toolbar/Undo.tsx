import React from "react";

interface Props {
   handler: any;
}

const Undo: React.FC<Props> = ({ handler }) => {
   const cl =
      "c-toolbar__item c-toolbar__item--undo c-toolbar__item--link";

   return (
      <>
         <li className={cl} onClick={handler}>
            Undo
         </li>
      </>
   );
};

export default Undo;
