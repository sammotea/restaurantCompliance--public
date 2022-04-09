import React from "react";

interface Props {
   user: string;
   hUserSwitch(user: string): void;
}

/**
***   This is dummy functionality for
***   demonstration purposes. 
**/

const UserSwitch: React.FC<Props> = ({ user, hUserSwitch }) => {
   function renderUserSwitch() {
      return (
         <div
            className="c-userWrap"
            onClick={() => {
               if (user === "notManager") {
                  hUserSwitch("manager");
               } else {
                  hUserSwitch("notManager");
               }
            }}
         >
            <div className={"c-user c-user--" + user}></div>
         </div>
      );
   }

   return <>{renderUserSwitch()}</>;
};

export default UserSwitch;
