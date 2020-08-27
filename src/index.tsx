import React from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import parser from "./_helpers/taskParser";
import Todo from "./_components/Todo";

const ComplianceList: React.FC = () => {
  const tasksByType = parser.parse(taskJson["tasks"]);

  function renderTodoList(tasks: iTaskList) {
    if (Object.keys(tasks).length !== 0) {
      const todos: JSX.Element[] = [];

      for (const [title, task] of Object.entries(tasks)) {
        todos.push(<Todo key={title} {...task} />);
      }

      if (todos.length) {
        return <ul className="[ c-todos ]">{todos}</ul>;
      }
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

  function renderTodos() {
    if (Object.keys(tasksByType).length !== 0) {
      return renderTodoSections();
    }
  }

  return <>{renderTodos()}</>;
};
render(<ComplianceList />, document.getElementById("root"));
