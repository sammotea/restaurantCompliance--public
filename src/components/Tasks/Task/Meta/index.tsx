import React from "react";

interface Props {}

const Meta: React.FC<Props> = ({ children }) => {
   const cl = `c-meta`;

   return <div className={cl}>{children}</div>;
};

export default Meta;
