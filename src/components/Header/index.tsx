import React from "react";

interface Props {}

const Header: React.FC<Props> = ({ children }) => {
   const cl = "l-header";

   return <header className={cl}>{children}</header>;
};

export default Header;
