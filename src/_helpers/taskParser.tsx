const taskParser = {
  tasksByType: {} as iTasksByX,

  parse(jsonList: iTaskAsJson[]): iTasksByX {
    const tasks = [...jsonList];

    if (Array.isArray(tasks)) {
      this.parseTasks(tasks);
      return this.tasksByType;
    } else {
      throw new Error();
    }
  },

  parseTasks(tasks: iTaskAsJson[]): void {
    for (let i = 0; i < tasks.length; i++) {
      this.parseTaskByType(tasks[i]);
    }
  },

  parseTaskByType(task: iTaskAsJson): void {
    const { title, type } = {
      ...task,
    };

    if (
      title &&
      "string" === typeof title &&
      type &&
      "string" === typeof type
    ) {
      if (!this.tasksByType[type]) {
        this.tasksByType[type] = {};
      }

      if (!task.hasOwnProperty("isComplete")) {
        task["isComplete"] = false;
      }
      task["permission"] = "any";
      this.tasksByType[type][title] = task;
    }
  },
};

export default taskParser;
