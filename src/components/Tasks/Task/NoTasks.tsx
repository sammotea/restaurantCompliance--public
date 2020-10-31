import React from "react";

interface Props {
   view: string;
}

const NoTasks: React.FC<Props> = ({ view }) => {
   const _cl = "c-noTasks";

   return <>{renderNoTaskMessage()}</>;

   function renderNoTaskMessage() {
      const cl = `${_cl}`;

      return <div className={cl}>{renderTitle()}</div>;
   }

   function renderTitle() {
      const cl = `${_cl}__title`;
      const text = getProseForView();
      return <h1 className={cl}>{text}</h1>;
   }

   function getProseForView(): string {
      let prose = "";

      switch (view) {
         case "incomplete":
            prose = "All tasks done.";
            break;

         case "forReview":
            prose = "No tasks to review.";
            break;

         case "complete":
            prose = "No tasks done yet.";
            break;

         default:
            throw new Error("getProseForView: unrecognised view");
      }

      return prose;
   }
};

export default NoTasks;
