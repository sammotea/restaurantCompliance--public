import React from "react";
import Title from "../Location/Title";
import Categories from "../../Categories";

interface Props {
  name: string;
  tasksByCategory: iTaskMeta;
}

const Location: React.FC<Props> = ({ name, tasksByCategory }) => {
  function renderLocationItem() {
    if (Object.keys(tasksByCategory).length !== 0) {
      return (
        <li className="[ c-location ]">
          {renderTitle()}
          {renderCategories()}
        </li>
      );
    }
  }

  function renderTitle() {
    return <Title title={name} />;
  }

  function renderCategories() {
    return <Categories tasksByCategory={tasksByCategory} />;
  }

  return <>{renderLocationItem()}</>;
};

export default Location;
