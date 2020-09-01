import React, { useState, useContext } from "react";
import User from "../../_data/user";

interface Props extends iTask {
  handlers: TodoActions;
}

const Todo: React.FC<Props> = ({
  title,
  subtasks = [],
  doer,
  hasProblem,
  type,
  handlers,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const user = useContext(User);

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function hFailureClick() {
    if (user !== "manager") {
      handlers.problemize(title, type, user, true);
    } else {
      handlers.fail(title, type, user, user);
    }
    toggleDetails();
  }

  function hTitleClick() {
    if (doer) {
      handlers.reset(title, type, "doer");
    } else {
      if (user !== "manager") {
        handlers.markForReview(title, type, user);
      } else {
        handlers.complete(title, type, user, user);
      }
    }
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
        <div className="c-todo__details">
          <div className="c-todo__addProblem" onClick={hFailureClick}>
            Raise an issue?
          </div>
          {renderSubtasks()}
        </div>
      </div>
    );
  }

  function renderDetailsToggle() {
    return (
      <span
        className="[ c-todo__toggle ]"
        onClick={toggleDetails}
      ></span>
    );
  }

  function renderTitle() {
    return (
      <h1 className="[ c-todo__title ]" onClick={hTitleClick}>
        {title}
      </h1>
    );
  }

  function renderTodo() {
    if (title) {
      let todoClassName = "c-todo";

      todoClassName += showDetails ? " js-show " : "";

      if (doer) {
        if (hasProblem) {
          todoClassName += " c-todo--hasProblem ";
        } else {
          todoClassName += " c-todo--awaitingReview ";
        }
      }
      todoClassName += doer !== "" ? " js-complete " : "";

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
