const taskReducer = (state, action) => {
   if (!action.payload.taskId || !action.payload.taskCat)
      throw new Error();

   function setWorker(task, worker) {
      task["compliance"]["worker"] = worker;
      return task;
   }

   function setReviewer(task, reviewer) {
      task["compliance"]["reviewer"] = reviewer;
      return task;
   }

   function setStatus(task, status) {
      if (
         ![
            "pending",
            "blocked",
            "forReview",
            "complete",
            "failed",
         ].includes(status)
      ) {
         throw new Error();
      }
      task["compliance"]["status"] = status;
      return task;
   }

   function setflagWorker(task, flagWorker = false) {
      task["compliance"]["flagWorker"] = flagWorker;
      return task;
   }

   switch (action.type) {
      case "COMPLETETASK":
         const {
            taskId,
            taskCat,
            worker = "",
            reviewer = "",
            flagWorker = false,
         } = action.payload;

         let task = { ...state[taskCat][taskId] };
         console.log(task);
         task = setWorker(task, worker);
         task = setReviewer(task, reviewer);
         task = setStatus(task, "complete");
         task = setflagWorker(task, flagWorker);

         return {
            ...state,
            [taskCat]: {
               ...state[taskCat],
               [taskId]: task,
            },
         };

         break;

      default:
         throw new Error();
   }
};

export default taskReducer;
