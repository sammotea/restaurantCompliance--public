import React, { useState, useContext } from "react";
import User from "../../_data/user";

interface Props extends iTask {
  handlers: TodoActions;
}

const Done: React.FC<Props> = ({ title }) => {
  function renderDone() {
    return <h1>{title}</h1>;
  }

  return <>{renderDone()}</>;
};

export default Done;
