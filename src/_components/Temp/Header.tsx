import React from "react";

interface Props {}

const Header: React.FC<Props> = ({ children }) => {
   const cl = "c-header";

   return <header className={cl}>{children}</header>;
};

export default Header;
