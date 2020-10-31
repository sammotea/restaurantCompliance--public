import React, { useState, useContext } from "react";
import Permission from "../../../contexts/permission";
import CurrentView from "../../../contexts/currentVIew";

interface Props {
   currentMeta: string;
   hMetaChange(metaOption: string): void;
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
         <ul className={`c-taskOptions--meta`}>
            {metaOptions.map((metaOption) => {
               return (
                  <li
                     key={metaOption}
                     onClick={() => hMetaClick(metaOption)}
                     className={`c-taskOption--meta c-taskOption--${metaOption} ${
                        currentMeta === metaOption
                           ? "s--isSelected"
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

   function getMetaOptions(): string[] {
      const metaOptions = ["info"];

      if (canReview) {
         metaOptions.push("comments");
      }

      return orderOptions(metaOptions);
   }

   function orderOptions(options: string[]): string[] {
      const metaOrder = {
         comments: 1,
         info: 1001,
      };

      return options.sort((a, b) => {
         return metaOrder[a] - metaOrder[b];
      });
   }

   function hMetaClick(metaOption: string) {
      hMetaChange(currentMeta === metaOption ? "" : metaOption);
   }
};

export default MetaOptions;
