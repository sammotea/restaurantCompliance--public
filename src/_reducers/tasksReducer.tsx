const taskReducer = (state, action) => {
   if (!action.payload.taskId || !action.payload.taskCat)
      throw new Error();

   const {
      taskId,
      taskCat,
      worker = "",
      reviewer = "",
      flagWorker = false,
      isBlocked = false,
   } = action.payload;
   let task = { ...state[taskCat][taskId] };

   function setTaskWorker(worker) {
      task["compliance"]["worker"] = worker;
      return task;
   }

   function setTaskReviewer(reviewer) {
      task["compliance"]["reviewer"] = reviewer;
      return task;
   }

   function validateStatus(status) {
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
      } else {
         return status;
      }
   }

   function setTaskStatus(status) {
      status = validateStatus(status);
      task["compliance"]["status"] = status;
      return task;
   }

   function setTaskFlagWorker(flagWorker = false) {
      task["compliance"]["flagWorker"] = flagWorker;
      return task;
   }

   function mergeTaskWithState() {
      return {
         ...state,
         [taskCat]: {
            ...state[taskCat],
            [taskId]: task,
         },
      };
   }

   switch (action.type) {
      case "COMPLETE":
         setTaskStatus("complete");
         setTaskWorker(worker);
         setTaskReviewer(reviewer);
         setTaskFlagWorker(flagWorker);

         return mergeTaskWithState();

         break;

      case "FORREVIEW":
         setTaskStatus(isBlocked ? "blocked" : "forReview");
         setTaskWorker(worker);
         // Undo reviewed
         setTaskReviewer("");
         setTaskFlagWorker(false);

         return mergeTaskWithState();

         break;

      case "FAILED":
         setTaskStatus("failed");
         setTaskWorker(worker);
         setTaskReviewer(reviewer);

         return mergeTaskWithState();

         break;

      case "RESET":
         setTaskStatus("pending");
         setTaskWorker("");
         setTaskReviewer("");
         setTaskFlagWorker(false);

         return mergeTaskWithState();

         break;

      default:
         throw new Error();
   }
};

export default taskReducer;
