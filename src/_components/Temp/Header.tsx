import React from "react";

interface Props {}

const Header: React.FC<Props> = ({ children }) => {
   const cl = "c-header";

   return <div className={cl}>{children}</div>;
};

export default Header;
