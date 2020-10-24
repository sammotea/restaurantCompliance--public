import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";

interface Props {}

const MetaOptions: React.FC<Props> = ({}) => {
   const canReview = useContext(Permission);

   return <>{renderMetaOptions()}</>;

   function renderMetaOptions() {
      const metaOptions = getMetaOptions();

      return (
         <ul className={`c-task__metaOptions`}>
            {metaOptions.map((status) => {
               return (
                  <li
                     key={status}
                     className={`c-task__metaOption c-task__metaOption--${status}`}
                  >
                     <span></span>
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
