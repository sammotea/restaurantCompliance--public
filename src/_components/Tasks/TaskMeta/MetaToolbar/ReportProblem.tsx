import React from "react";

interface Props {
   handler: any;
}

const ReportProblem: React.FC<Props> = ({ handler, children }) => {
   return (
      <>
         <li
            className="c-metaToolbar__item c-metaToolbar__item--reportProblem"
            onClick={handler}
         >
            Report a problem
         </li>
      </>
   );
};

export default ReportProblem;
