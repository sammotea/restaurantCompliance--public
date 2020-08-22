import React from "react";

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="[ c-location__title ]">
      <span>The</span>
      {" " + title}
    </h1>
  );
};

export default Title;
