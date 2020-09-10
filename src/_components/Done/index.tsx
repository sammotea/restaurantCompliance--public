import React, { useState, useContext } from "react";
import User from "../../_contexts/user";

interface Props extends iTask {
   handlers: TodoActions;
}

const Done: React.FC<Props> = ({ title, compliance: { status } }) => {
   function renderDone() {
      const text = status === "failed" ? "FAIL! " : "";
      return (
         <h1>
            {text}
            {title}
         </h1>
      );
   }

   return <>{renderDone()}</>;
};

export default Done;
