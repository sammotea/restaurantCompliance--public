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

      task = this.addMissingFields(task);
      this.tasksByType[type][title] = task;
    }
  },

  addMissingFields(task: iTaskRaw): iTask {
    [
      "doer",
      "reviewer",
      "isComplete",
      "isFailed",
      "hasProblem",
    ].forEach((k) => {
      switch (k) {
        case "doer":
        case "reviewer":
          if (!task.hasOwnProperty(k)) {
            task[k] = "";
          }
          break;

        case "hasProblem":
        case "isFailed":
        case "isComplete":
          if (!task.hasOwnProperty(k)) {
            task[k] = false;
          }
          break;

        default:
          break;
      }
    });

    return task as iTask;
  },
};

export default taskParser;
