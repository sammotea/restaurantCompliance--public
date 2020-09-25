import React from "react";

interface Props {
   status: string;
}

const TasksByStatusList: React.FC<Props> = ({ status, children }) => {
   function getTitle(title) {
      return <h1 className="todoSection__subtitle">{title}</h1>;
   }

   let title, cName;

   switch (status) {
      case "Pending":
         cName = "c-pendingTasks";
         break;

      case "ForReview":
         title = "Awaiting sign-off";
         cName = "c-forReviews";
         break;

      case "Done":
         title = "Reviewed";
         cName = "c-dones";
   }

   if (title) {
      title = getTitle(title);
   }

   return (
      <>
         {title}
         <ul className={cName}>{children}</ul>
      </>
   );
};

export default TasksByStatusList;
