import React from "react";

interface Props {
   handler: any;
}

const ReportProblem: React.FC<Props> = ({ handler }) => {
   const cl =
      "c-toolbar__item c-toolbar__item--reportProblem c-toolbar__item--link";

   return (
      <>
         <li className={cl} onClick={handler}>
            Report a problem
         </li>
      </>
   );
};

export default ReportProblem;
