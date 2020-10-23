import React, { useState, useContext } from "react";

import Permission from "../../_contexts/permission";

interface Props {
   status: string;
   hUpdateStatus: any;
}

const Statuses: React.FC<Props> = ({ status, hUpdateStatus }) => {
   
   const canReview = useContext(Permission);
   const statuses = ['incomplete'];
   const cl = `c-statusesWrap`;

   if (canReview) {
      statuses.push("awaitingReview", "complete");
   }

   return <div className={cl}><ul className="c-statuses">{renderStatuses()}</ul></div>;

   function renderStatuses() {
      return statuses.map((status) => {
         const clListItem = `c-status c-status--${status}`;

         return (
            <li className={clListItem} key={status} id={ status } onClick={ hStatusClick }>
               { getTitle( status ) }
            </li>
         );
      });
   }

   function getTitle( status ) {

      switch( status ) {

         case 'incomplete':
            return 'Get it done';
            break;

            case 'awaitingReview':
               return 'Needs sign-off';
               break;

               case 'complete':
                  return 'Already done';
                  break;

                  default:
                     return new Error( 'getTitle: unrecognised status');
      }
   }

   function hStatusClick( e ) {
      
      if( canReview ) {
         const curPos = statuses.indexOf( e.target.id );
         const nextPos = statuses[ curPos + 1 ] ? curPos + 1 : 0;

         hUpdateStatus( statuses[ nextPos ] );
      }

   }

   }
};

export default Statuses;
