import React, { useState } from "react";

interface Props extends iTask {
  hCompleteTodo(title: string, type: string): void;
}

const Todo: React.FC<Props> = ({
  title,
  subtasks = [],
  type,
  isComplete,
  hCompleteTodo,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  function toggleDetails(e: React.MouseEvent) {
    setShowDetails(!showDetails);
  }

  function renderSubtasks() {
    if (subtasks.length) {
      const subtaskList = subtasks.map((subtask) => {
        if ("string" === typeof subtask) {
          const k = subtask.replace(" ", "_").substring(0, 50);

          return (
            <li key={k} className="[ c-todo__subtask ]">
              {subtask}
            </li>
          );
        }
      });

      if (subtaskList.length) {
        return (
          <ul className="[ c-todo__subtasks ]">{subtaskList}</ul>
        );
      }
    }
  }

  function renderDetails() {
    return (
      <div className="c-todo__detailsWrap">
        <div className="c-todo__details">{renderSubtasks()}</div>
      </div>
    );
  }

  function renderDetailsToggle() {
    return (
      <div
        className="[ c-todo__detailsToggleWrap ]"
        onClick={toggleDetails}
      >
        <svg
          className="[ c-todo__detailsToggle ]"
          viewBox="0 0 64 304"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m32 120c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-32-88c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z" />
        </svg>
      </div>
    );
  }

  function renderTitle() {
    return (
      <h1
        className="[ c-todo__title ]"
        onClick={() => hCompleteTodo(title, type)}
      >
        {title}
      </h1>
    );
  }

  function renderTodo() {
    if (title) {
      let todoClassName = "c-todo";

      todoClassName += showDetails ? " js-show " : "";
      todoClassName += isComplete ? " js-complete " : "";

      return (
        <li key={title} className={todoClassName}>
          {renderTitle()}
          {renderDetailsToggle()}
          {renderDetails()}
        </li>
      );
    }
  }

  return <>{renderTodo()}</>;
};

export default Todo;
