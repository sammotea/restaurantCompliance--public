import React, { useState, useContext } from "react";

import Permission from "../../_contexts/permission";

interface Props {
   hUpdateView: any;
}

const Views: React.FC<Props> = ({ hUpdateView }) => {
   
   const canReview = useContext(Permission);
   const statuses = ['incomplete'];
   const cl = `c-viewsWrap`;

   if (canReview) {
      statuses.push("awaitingReview", "complete");
   }

   return <div className={cl}><ul className="c-views">{renderViews()}</ul></div>;

   function renderViews() {
      return statuses.map((status) => {
         const clListItem = `c-view c-view--${status}`;

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

         hUpdateView( statuses[ nextPos ] );
      }

   }

   }
};

export default Views;
