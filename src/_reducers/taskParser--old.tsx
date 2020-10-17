const taskParser = {
   tasksBycategory: {} as iTasksByX,

   parse(jsonList: iTaskAsJson[]): iTasksByX {
      const tasks = [...jsonList];

      if (Array.isArray(tasks)) {
         this.parseTasks(tasks);
         return this.tasksBycategory;
      } else {
         throw new Error();
      }
   },

   parseTasks(tasks: iTaskAsJson[]): void {
      for (let i = 0; i < tasks.length; i++) {
         this.parseTaskBycategory(tasks[i]);
      }
   },

   parseTaskBycategory(task: iTaskAsJson): void {
      const { title, category } = {
         ...task,
      };

      if (
         title &&
         "string" === typeof title &&
         category &&
         "string" === typeof category
      ) {
         if (!this.tasksBycategory[category]) {
            this.tasksBycategory[category] = {};
         }

         task = this.addMissingFields(task);
         this.tasksBycategory[category][title] = task;
      }
   },

   addMissingFields(task: iTaskRaw): iTask {
      task["compliance"] = {} as iComplianceObj;

      [
         "worker",
         "reviewer",
         "status",
         "flagWorker",
         "comments",
      ].forEach((k) => {
         switch (k) {
            case "worker":
            case "reviewer":
               if (!task.hasOwnProperty(k)) {
                  task["compliance"][k] = "";
               }
               break;

            case "status":
               if (!task.hasOwnProperty(k)) {
                  task["compliance"][k] = "pending";
               }
               break;

            case "flagWorker":
               if (!task.hasOwnProperty(k)) {
                  task["compliance"][k] = false;
               }
               break;

            case "comments":
               if (!task.hasOwnProperty(k)) {
                  task["compliance"][k] = [];
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
