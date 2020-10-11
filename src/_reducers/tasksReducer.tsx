import pseudoUid from "../_utils/random";

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
      commentText = "",
      commentAuthor = "",
      commentId = "",
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

   function addComment(commentAuthor, commentText) {
      if (!commentAuthor || !commentText) {
         throw new Error();
      }

      const comment = {
         id: pseudoUid(),
         author: commentAuthor,
         comment: commentText,
      };

      task["compliance"]["comments"].push(comment);

      return task;
   }

   function deleteComment(commentId) {
      const comments = task["compliance"]["comments"];

      if (commentId && comments.length) {
         task["compliance"]["comments"] = comments.filter((el) => {
            if (el.id === commentId) {
               return false;
            } else {
               return true;
            }
         });

         return task;
      } else {
         throw new Error();
      }
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

         break;

      case "FORREVIEW":
         setTaskStatus(isBlocked ? "blocked" : "forReview");
         setTaskWorker(worker);
         // Undo reviewed
         setTaskReviewer("");
         setTaskFlagWorker(false);

         break;

      case "FAILED":
         setTaskStatus("failed");
         setTaskWorker(worker);
         setTaskReviewer(reviewer);

         break;

      case "RESET":
         setTaskStatus("pending");
         setTaskWorker("");
         setTaskReviewer("");
         setTaskFlagWorker(false);

         break;

      case "ADDCOMMENT":
         addComment(commentAuthor, commentText);

         break;

      case "DELETECOMMENT":
         deleteComment(commentId);

         break;

      default:
         throw new Error();
   }

   return mergeTaskWithState();
};

export default taskReducer;
