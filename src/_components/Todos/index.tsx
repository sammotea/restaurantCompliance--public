import React from "react";
import Todo from "../Todo";
import Toreview from "../Toreview";

interface Props {
  tasksByType: iTasksByX;
  hCompleteTodo(title: string, type: string): void;
}

const Todos: React.FC<Props> = ({ tasksByType, hCompleteTodo }) => {
  function renderTodoList(tasks: iTaskList) {
    if (Object.keys(tasks).length !== 0) {
      const todoList: JSX.Element[] = [];
      const todos: JSX.Element[] = [];
      const toreviews: JSX.Element[] = [];

      for (const [title, task] of Object.entries(tasks)) {
        if (!task.isComplete) {
          todos.push(
            <Todo
              key={title}
              hCompleteTodo={hCompleteTodo}
              {...task}
            />
          );
        } else {
          toreviews.push(<Toreview key={title} {...task} />);
        }
      }

      if (todos.length) {
        todoList.push(
          <ul key="todos" className="[ c-todos ]">
            {todos}
          </ul>
        );
      }

      if (toreviews.length) {
        todoList.push(
          <ul key="toreviews" className="[ c-toreviews ]">
            {toreviews}
          </ul>
        );
      }

      return <>{todoList}</>;
    }
  }

  function renderSectionTitle(type: string) {
    return (
      <h1 className="[ c-todoSection__title ]">
        <span>The</span>
        {" " + type}
      </h1>
    );
  }

  function renderTodoSections() {
    const sections: JSX.Element[] = [];

    for (const type in tasksByType) {
      sections.push(
        <li key={type} className="[ c-todoSection ]">
          {renderSectionTitle(type)}
          {renderTodoList(tasksByType[type] as iTaskList)}
        </li>
      );
    }

    return <ul className="[ c-todoSections ]">{sections}</ul>;
  }

  return <>{renderTodoSections()}</>;
};

export default Todos;
