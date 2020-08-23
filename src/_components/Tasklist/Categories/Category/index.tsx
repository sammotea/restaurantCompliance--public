import React from "react";
import Title from "./Title";
import Task from "../../Task";

interface Props {
  name: string;
  tasks: Task[];
}

const Category: React.FC<Props> = ({ name, tasks }) => {
  function renderCategoryItem() {
    if (tasks.length !== 0) {
      return (
        <li className="[ c-category ]">
          {renderTitle()}
          {renderTasks()}
        </li>
      );
    }
  }

  function renderTitle() {
    return <Title title={name} />;
  }

  function renderTasks() {
    const taskList = tasks.map((task) => (
      <Task key={name + "_" + task.title} {...task} />
    ));
    return <ul className="[ c-tasks ]">{taskList}</ul>;
  }

  return <>{renderCategoryItem()}</>;
};

export default Category;
