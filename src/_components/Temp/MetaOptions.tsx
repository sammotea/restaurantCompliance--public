import React, { useState, useContext } from "react";
import Permission from "../../_contexts/permission";
import CurrentView from "../../_contexts/currentVIew";

interface Props {
   currentMeta: string;
   hMetaChange: any;
}

const MetaOptions: React.FC<Props> = ({
   currentMeta,
   hMetaChange,
}) => {
   const canReview = useContext(Permission);
   const currentView = useContext(CurrentView);

   return <>{renderMetaOptions()}</>;

   function renderMetaOptions() {
      const metaOptions = getMetaOptions();

      return (
         <ul className={`c-task__metaOptions`}>
            {metaOptions.map((metaOption) => {
               return (
                  <li
                     key={metaOption}
                     onClick={() => hMetaClick(metaOption)}
                     className={`c-task__metaOption c-task__metaOption--${metaOption} ${
                        currentMeta === metaOption
                           ? "js-isSelected"
                           : ""
                     }`}
                  >
                     <span
                        className={`c-icon c-icon--${metaOption}`}
                     ></span>
                  </li>
               );
            })}
         </ul>
      );
   }

   function getMetaOptions() {
      const metaOptions = ["info"];

      if (canReview && currentView !== "incomplete") {
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

   function hMetaClick(metaOption) {
      hMetaChange(currentMeta === metaOption ? "" : metaOption);
   }
};

export default MetaOptions;
