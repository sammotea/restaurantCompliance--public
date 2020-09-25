import React from "react";

interface Props {
   handler: any;
}

const ReportProblem: React.FC<Props> = ({ handler, children }) => {
   return (
      <>
         <li
            className="c-toolbar__item c-toolbar__item--reportProblem c-toolbar__item--link"
            onClick={handler}
         >
            Report a problem
         </li>
      </>
   );
};

export default ReportProblem;
