import React, { useState } from "react";

interface Props extends iTask {
  hCompleteTodo(title: string, type: string): void;
}

const Todo: React.FC<Props> = ({
  title,
  requirements = [],
  type,
  hCompleteTodo,
  isComplete = false,
}) => {
  const [details, setDetails] = useState(false);

  function showDetails(e: React.MouseEvent) {
    setDetails(!details);
  }

  function renderRequirements() {
    if (requirements.length) {
      const requirementList = requirements.map((requirement) => {
        if ("string" === typeof requirement) {
          const k = requirement.replace(" ", "_").substring(0, 50);

          return (
            <li key={k} className="[ c-todo__requirement ]">
              {requirement}
            </li>
          );
        }
      });

      if (requirementList.length) {
        return (
          <ul className="[ c-todo__requirements ]">
            {requirementList}
          </ul>
        );
      }
    }
  }

  function renderDetails() {
    return (
      <div className="c-todo__detailsWrap">
        <div className="c-todo__details">{renderRequirements()}</div>
      </div>
    );
  }

  function renderDetailsToggle() {
    return (
      <div
        className="[ c-todo__detailsToggleWrap ]"
        onClick={showDetails}
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

  function renderTask() {
    if (title) {
      let taskClassName = "c-todo";

      taskClassName += details ? " js-show " : "";
      taskClassName += isComplete ? " js-complete " : "";

      return (
        <li key={title} className={taskClassName}>
          {renderTitle()}
          {renderDetailsToggle()}
          {renderDetails()}
        </li>
      );
    }
  }

  return <>{renderTask()}</>;
};

export default Todo;
