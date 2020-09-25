import React from "react";

interface Props {}

const Toolbar: React.FC<Props> = ({ children }) => {
   return <ul className="c-toolbar">{children}</ul>;
};

export default Toolbar;
