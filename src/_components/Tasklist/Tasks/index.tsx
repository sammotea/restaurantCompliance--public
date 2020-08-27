import React from "react";
import Task from "./Task";

interface Props {
  tasks: Task[];
}

const Tasks: React.FC<Props> = ({ tasks }) => {
  function renderTasks() {
    const taskList = tasks.map((task) => (
      <Task key={name + "_" + task.title} {...task} />
    ));
    return <ul className="[ c-tasks ]">{taskList}</ul>;
  }

  return <>{renderTasks()}</>;
};

export default Tasks;
