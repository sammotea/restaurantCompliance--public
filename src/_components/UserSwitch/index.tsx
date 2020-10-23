import React from "react";

const UserSwitch: React.FC<{ hSwitch: any; user: string }> = ({
   hSwitch,
   user,
}) => {
   function renderUserSwitch() {
      return (
         <div
            className="c-userWrap"
            onClick={() => {
               if (user === "notManager") {
                  hSwitch("manager");
               } else {
                  hSwitch("notManager");
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
