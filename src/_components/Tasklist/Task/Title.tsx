import React from "react";

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <h1 className="[ c-task__title ]">{title}</h1>;
};

export default Title;
