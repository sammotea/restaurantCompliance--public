import React from "react";

interface Props {
  title: string;
  clickHandler(e: React.MouseEvent): void;
}

const Title: React.FC<Props> = ({ title, clickHandler }) => {
  return (
    <h1 className="[ c-todo__title ]" onClick={clickHandler}>
      {title}
    </h1>
  );
};

export default Title;
