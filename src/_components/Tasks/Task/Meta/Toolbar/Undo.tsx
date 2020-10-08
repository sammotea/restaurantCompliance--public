import React from "react";

interface Props {
   handler: any;
}

const Undo: React.FC<Props> = ({ handler }) => {
   return (
      <>
         <li
            className="c-toolbar__item c-toolbar__item--undo c-toolbar__item--link"
            onClick={handler}
         >
            Undo
         </li>
      </>
   );
};

export default Undo;