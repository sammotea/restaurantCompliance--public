import React from "react";

const Dispatch = React.createContext<null | React.Dispatch<Dispatch>>(null);

export default Dispatch;
