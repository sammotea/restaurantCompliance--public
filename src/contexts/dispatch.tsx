import React from "react";

const Dispatch = React.createContext<null | React.Dispatch<DispatchActions>>(
    null
);

export default Dispatch;
