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
      task["compliance"] = {} as iComplianceObj;

      ["worker", "reviewer", "status", "flagWorker"].forEach((k) => {
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

            default:
               break;
         }
      });

      if ("Tables" === task.title) {
         task["compliance"]["comments"] = [
            {
               author: "Sam",
               id: "125234",
               comment:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius delectus aspernatur omnis incidunt ipsum voluptates minus explicabo minima, optio quis quae assumenda corrupti placeat eligendi enim amet vero ut dolores!",
            },

            {
               author: "Tess",
               id: "42344",
               comment:
                  "PETER FAIL: Eius delectus aspernatur omnis incidunt ipsum voluptates minus explicabo minima, optio quis quae assumenda corrupti placeat eligendi enim amet vero ut dolores!",
            },
         ];
      }

      return task as iTask;
   },
};

export default taskParser;
