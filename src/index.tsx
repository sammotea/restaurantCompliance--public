import React from "react";
import { render } from "react-dom";

const Application: React.FC<{}> = () => <h1>Test</h1>;

render(<Application />, document.getElementById("root"));
