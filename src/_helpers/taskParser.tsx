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
      "permission",
      "hasProblem",
      "isComplete",
      "completedBy",
      "confirmedBy",
      "review",
    ].forEach((k) => {
      switch (k) {
        case "permission":
          if (!task.hasOwnProperty(k)) {
            task[k] = "any";
          }
          break;

        case "hasProblem":
        case "isComplete":
          if (!task.hasOwnProperty(k)) {
            task[k] = false;
          }
          break;

        case "completedBy":
        case "confirmedBy":
        case "review":
          if (!task.hasOwnProperty(k)) {
            task[k] = "";
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
