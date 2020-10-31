import React, { useContext } from "react";
import CurrentView from "../../../../contexts/currentVIew";

interface Props {
   worker: string;
   reviewer: string;
}

const History: React.FC<Props> = ({ worker, reviewer }) => {
   const currentView = useContext(CurrentView);

   return <>{renderHistory()}</>;

   function renderHistory() {
      const cl = `c-history`;
      const historyItems = getHistoryItems();

      if (historyItems.length)
         return <ul className={cl}>{historyItems}</ul>;
   }

   function getHistoryItems(): string[] {
      const historyItems = [];

      ["worker", "reviewer"].forEach((title) => {
         let doer = "";
         const cl = `c-history__item c-history__item--${title}`;

         switch (title) {
            case "worker":
               if (worker) {
                  doer = worker;
               }
               break;

            case "reviewer":
               if (currentView === "complete" && reviewer)
                  doer = reviewer;
               break;
         }

         if (doer) {
            historyItems.push(
               <li key={title} className={cl}>
                  {doer}
               </li>
            );
         }
      });

      return historyItems;
   }
};

export default History;
