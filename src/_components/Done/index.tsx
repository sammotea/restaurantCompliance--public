import React, { useState, useContext } from "react";
import User from "../../_data/user";

interface Props extends iTask {
  handlers: TodoActions;
}

const Done: React.FC<Props> = ({ title, isFailed }) => {
  function renderDone() {
    const text = isFailed ? "FAIL! " : "";
    return (
      <h1>
        {text}
        {title}
      </h1>
    );
  }

  return <>{renderDone()}</>;
};

export default Done;
