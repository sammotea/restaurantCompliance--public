import React, { useState } from "react";

interface Props {
   parent: string;
}

const TaskMeta: React.FC<Props> = ({ parent, children }) => {
   const [showMeta, setShowMeta] = useState(false);
   const cl = showMeta ? " isVisible " : "";
   function toggleMeta() {
      setShowMeta(!showMeta);
   }

   return (
      <>
         <div
            className={"c-taskMeta__toggle" + cl}
            onClick={toggleMeta}
         ></div>

         <div className={"c-taskMetaWrap" + cl}>
            <div className="c-taskMeta">{children}</div>
         </div>
      </>
   );
};

export default TaskMeta;
