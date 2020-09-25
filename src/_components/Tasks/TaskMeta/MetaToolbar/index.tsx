import React from "react";

interface Props {}

const MetaToolbar: React.FC<Props> = ({ children }) => {
   return <ul className="c-metaToolbar">{children}</ul>;
};

export default MetaToolbar;
