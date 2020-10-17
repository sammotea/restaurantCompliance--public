import pseudoUid from "../_utils/random";

const complianceStateReducer = (state, action) => {
   // Early exit
   if (
      !action.payload ||
      !action.payload.taskId ||
      !action.payload.taskCat
   ) {
      throw new Error(
         "complianceStateReducer() : No payload or missing details"
      );
   }

   const p = action.payload;
   const { taskId, taskCat } = p;
   const compliance = { ...state[taskCat][taskId]["compliance"] };

   const defaults = {
      status: "incomplete",
      worker: "",
      reviewer: "",
      workerFlag: false,
   };

   switch (action.type) {
      case "AWAITINGREVIEW":
         if (validatePayload("worker")) {
            reset("reviewer", "workerFlag");

            updateWorker();
            updateStatus(p.isBlocked ? "blocked" : "awaitingReview");
         }

         break;

      case "COMPLETE":
      case "FAILED":
         if (validatePayload("worker", "reviewer")) {
            updateWorker();
            updateReviewer();
            updateWorkerFlag();
            updateStatus(action.type.toLowerCase());
         }

         break;

      case "ADDCOMMENT":
         if (validatePayload("commentAuthor", "commentText")) {
            createComment();
         }

         break;

      case "DELETECOMMENT":
         if (validatePayload("commentId")) {
            deleteComment();
         }

         break;

      case "RESET":
         resetAll();
         break;

      default:
         throw new Error(
            "complianceStateReducer() : Action not recognised"
         );
   }

   return mergeComplianceWithState();

   /*/
   ///   Start functions
   /*/

   function createComment() {
      compliance["comments"].push({
         id: pseudoUid(),
         author: p.commentAuthor,
         comment: p.commentText,
      });
   }

   function deleteComment() {
      const comments = compliance["comments"];

      if (comments.length) {
         let commentFound = false;

         compliance["comments"] = comments.filter((comment) => {
            if (comment.id === p["commentId"]) {
               commentFound = true;
               return false;
            } else {
               return true;
            }
         });

         if (!commentFound) {
            throw new Error(
               "deleteComment() : No comment with that id"
            );
         }
      } else {
         throw new Error("deleteComment() : No comments exist");
      }
   }

   function updateStatus(status) {
      compliance["status"] = validateStatus(status);
   }

   function updateWorker() {
      compliance["worker"] = getValidatedUser("worker");
   }

   function updateReviewer() {
      compliance["reviewer"] = getValidatedUser("reviewer");
   }

   function updateWorkerFlag() {
      compliance["workerFlag"] = getValidatedWorkerFlag();
   }

   function validatePayload(...keys) {
      let isValid = true;

      keys.forEach((key) => {
         switch (key) {
            case "worker":
            case "reviewer":
               if (!getValidatedUser(key)) {
                  isValid = false;
               }
               break;

            case "commentAuthor":
            case "commentText":
               if (!p[key] || "string" !== typeof p[key]) {
                  isValid = false;
               }
               break;

            case "commentId":
               if (!p[key] || "number" !== typeof p[key]) {
                  isValid = false;
               }
               break;

            default:
               throw new Error(
                  "validatePayload() : key not recognised"
               );
         }
      });

      return isValid;
   }

   function validateStatus(status) {
      if (
         [
            "incomplete",
            "blocked",
            "awaitingReview",
            "complete",
            "failed",
         ].includes(status)
      ) {
         return status;
      } else {
         throw new Error("validateStatus() : status not recognised");
      }
   }

   function getValidatedWorkerFlag() {
      return p.workerFlag && "boolean" === typeof p.workerFlag
         ? p.workerFlag
         : getDefault("workerFlag");
   }

   function getValidatedUser(role) {
      const user = p[role];

      if (user && "string" === typeof user) {
         return user;
      } else {
         throw new Error("getValidatedUser() : invalid user");
      }
   }

   function resetAll() {
      for (const key in defaults) {
         compliance[key] = getDefault(key);
      }
   }

   function reset(...keys) {
      keys.forEach((key) => {
         compliance[key] = getDefault(key);
      });
   }

   function getDefault(key) {
      if (defaults.hasOwnProperty(key)) {
         return defaults[key];
      } else {
         throw new Error("getDefault() : key not recognised");
      }
   }

   function mergeComplianceWithState() {
      return {
         ...state,
         [taskCat]: {
            ...state[taskCat],
            [taskId]: {
               ...state[taskCat][taskId],
               compliance: compliance,
            },
         },
      };
   }
};

export default complianceStateReducer;
