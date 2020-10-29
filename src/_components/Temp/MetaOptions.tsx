import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";

interface Props {
   currentStatus: string;
}

const MetaOptions: React.FC<Props> = ({ currentStatus }) => {
   const canReview = useContext(Permission);

   return <>{renderMetaOptions()}</>;

   function renderMetaOptions() {
      const metaOptions = getMetaOptions();

      return (
         <ul className={`c-task__metaOptions`}>
            {metaOptions.map((statusOption) => {
               return (
                  <li
                     key={statusOption}
                     className={`c-task__metaOption c-task__metaOption--${statusOption} ${
                        currentStatus === statusOption
                           ? "js-isSelected"
                           : ""
                     }`}
                  >
                     <span
                        className={`c-icon c-icon--${statusOption}`}
                     ></span>
                  </li>
               );
            })}
         </ul>
      );
   }

   function getMetaOptions() {
      const metaOptions = ["info"];

      if (canReview) {
         metaOptions.push("comments");
      }

      return orderOptions(metaOptions);
   }

   function orderOptions(options) {
      const metaOrder = {
         comments: 1,
         info: 1001,
      };

      return options.sort((a, b) => {
         return metaOrder[a] - metaOrder[b];
      });
   }
};

export default MetaOptions;
