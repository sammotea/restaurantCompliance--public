import React from "react";

interface Props {}

const Toolbar: React.FC<Props> = ({ children }) => {
   const cl = "c-toolbar";

   return <ul className={cl}>{children}</ul>;
};

export default Toolbar;
