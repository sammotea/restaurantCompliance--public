const tasklistParser = {
  parsedList: {} as iTaskMeta,

  parse(jsonList: iTaskAsJson[]): iTaskMeta {
    const tasklistRaw = [...jsonList];

    if (Array.isArray(tasklistRaw)) {
      this.parseTasks(tasklistRaw);
      console.log(this.parsedList);
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
    const { title, location } = {
      ...task,
    };

    if (
      title &&
      "string" === typeof title &&
      location &&
      "string" === typeof location
    ) {
      if (!this.parsedList[location]) {
        this.parsedList[location] = {};
      }

      this.parsedList[location][title] = task;
    }
  },
};

export default tasklistParser;
