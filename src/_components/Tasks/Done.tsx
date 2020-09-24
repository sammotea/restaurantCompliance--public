import React, { useState, useContext } from "react";
import User from "../../_contexts/user";

const Done: React.FC<iTask> = ({ title, compliance: { status } }) => {
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
