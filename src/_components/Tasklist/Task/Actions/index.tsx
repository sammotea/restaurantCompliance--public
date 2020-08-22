import React from "react";

const Actions: React.FC<{}> = () => {
  return (
    <ul className="[ c-task__actions ]">
      <li className="[ c-task__action ]">
        <a href="#">Show details</a>
      </li>
      <li className="[ c-task__action ]">
        <a href="#">Add comment</a>
      </li>
    </ul>
  );
};

export default Actions;
