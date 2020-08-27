import React, { useState } from "react";
import Title from "./Title";
import Actions from "./Actions";

interface Props {}

const Task: React.FC<Task> = ({
  title,
  permission = "any",
  subtasks = [],
}) => {
  const [overflow, setOverflow] = useState(false);
  const [completion, setCompletion] = useState(false);

  function toggleOverflow(e: React.MouseEvent) {
    setOverflow(!overflow);
  }

  function toggleCompletion(e: React.MouseEvent) {
    console.log(e.target);

    setCompletion(!completion);
  }

  function renderTitle() {
    return <Title title={title} clickHandler={toggleCompletion} />;
  }

  function renderOverflow() {
    const overflowClassName =
      "[ c-task__overflow ]" + (overflow ? " [ js-show ]" : "");

    return (
      <>
        <div
          className="[ c-task__menuWrap ]"
          onClick={toggleOverflow}
        >
          <svg
            className="[ c-task__menu ]"
            viewBox="0 0 64 304"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m32 120c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-32-88c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z" />
          </svg>
        </div>
        <div className="c-task__overflowWrap">
          <div className="c-task__overflow">
            {renderActions()}
            {renderSubtasks()}
          </div>
        </div>
      </>
    );
  }

  function renderActions() {
    return <Actions />;
  }

  function renderSubtasks() {
    if (subtasks.length) {
      const subtaskList = subtasks.map((subtask) => {
        if ("string" === typeof subtask) {
          const k = subtask.replace(" ", "_").substring(0, 50);

          return (
            <li key={k} className="[ c-task__item ]">
              {subtask}
            </li>
          );
        }
      });

      if (subtaskList.length) {
        return <ul className="[ c-task__items ]">{subtaskList}</ul>;
      }
    }
  }

  function renderTask() {
    if (title) {
      let taskClassName = "c-task";

      taskClassName += overflow ? " js-show " : "";
      taskClassName += completion ? " js-complete " : "";

      return (
        <li key={title} className={taskClassName}>
          {renderTitle()}
          {renderOverflow()}
        </li>
      );
    }
  }

  return <>{renderTask()}</>;
};

export default Task;
