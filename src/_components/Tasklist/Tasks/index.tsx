import React from "react";
import Task from "./Task";

interface Props {
  tasks: iTaskList;
}

const Tasks: React.FC<Props> = ({ tasks }) => {
  function renderTasks() {
    const taskArr: JSX.Element[] = [];

    for (const [title, task] of Object.entries(tasks)) {
      taskArr.push(<Task key={title} {...task} />);
    }

    return <ul className="[ c-tasks ]">{taskArr}</ul>;
  }

  return <>{renderTasks()}</>;
};

export default Tasks;
