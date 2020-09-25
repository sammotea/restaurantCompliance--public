import React from "react";

interface Props {
   status: string;
}

const TasksByStatusList: React.FC<Props> = ({ status, children }) => {
   function getTitleText() {
      let title = "";

      switch (status) {
         case "forReview":
            title = "Awaiting sign-off";
            break;

         case "done":
            title = "Reviewed";
      }

      return title;
   }

   function renderTitle() {
      const title = getTitleText();

      if (title) {
         return <h1 className="c-taskSection__title">{title}</h1>;
      }
   }

   const simpleStatus = status === "blocked" ? "forReview" : status;
   const cl = `c-tasks c-${simpleStatus}Tasks`;

   return (
      <>
         {renderTitle()}
         <ul className={cl}>{children}</ul>
      </>
   );
};

export default TasksByStatusList;
