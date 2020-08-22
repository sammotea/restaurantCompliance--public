const tasklistParser = {
  parsedList: {} as iTaskMeta,

  parse(jsonList: iTaskAsJson[]): iTaskMeta {
    const tasklistRaw = [...jsonList];

    if (Array.isArray(tasklistRaw)) {
      this.parseTasks(tasklistRaw);
      return this.parsedList;
    } else {
      throw new Error();
    }
  },

  parseTasks(taskList: iTaskAsJson[]): void {
    for (let i = 0; i < taskList.length; i++) {
      this.parseTask(taskList[i]);
    }
  },

  parseTask(task: iTaskAsJson): void {
    const {
      title,
      location,
      category,
      subtasks = [],
      permission = "any",
    } = { ...task };

    if (
      title &&
      "string" === typeof title &&
      location &&
      "string" === typeof location &&
      category &&
      "string" === typeof category
    ) {
      if (!this.parsedList[location]) {
        this.parsedList[location] = {};
      }

      if (!this.parsedList[location][category]) {
        this.parsedList[location][category] = [];
      }

      this.parsedList[location][category].push({
        title,
        subtasks,
        permission,
      });
    }
  },
};

export default tasklistParser;
