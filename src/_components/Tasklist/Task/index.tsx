import React from "react";
import Title from "./Title";
import Actions from "./Actions";

interface Props {}

const Task: React.FC<Task> = ({
  title,
  permission = "any",
  subtasks = [],
}) => {
  function renderTitle() {
    return <Title title={title} />;
  }

  function renderActions() {
    return <Actions />;
  }

  function renderSubtasks() {
    if (subtasks.length) {
      const subtaskList = subtasks.map((subtask) => {
        if ("string" === typeof subtask) {
          return <li className="[ c-task__item ]">{subtask}</li>;
        }
      });

      if (subtaskList.length) {
        return <ul className="[ c-task__items ]">{subtaskList}</ul>;
      }
    }
  }

  function renderTask() {
    if (title) {
      return (
        <li className="[ c-task ]">
          {renderTitle()}
          {renderActions()}
          {renderSubtasks()}

          <div className="[ c-task__checkbox ]"></div>
        </li>
      );
    }
  }

  return <>{renderTask()}</>;
};

export default Task;
