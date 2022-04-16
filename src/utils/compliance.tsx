import pseudoUid from "./random";

const compliance = {
   addDefaults: function (acc: iTask[], cur: _iTask): iTask[] {
      const taskDefaults = {
         worker: "",
         reviewer: "",
         status: "incomplete",
         isBlocked: false,
         isFailed: false,
         isFixed: false,
         comments: [],
      } as ComplianceVariables;
      
      const task = { ...cur, ...{ 'compliance' : taskDefaults } };

      acc.push( task );
      return acc;
   },

   prepForStore: function (acc: iTasksByCategory, cur: iTask): iTasksByCategory {
      const _cur = { ...cur };
      const {
         title,
         category
      } = _cur;

      acc[category] = acc[category] || {};
      acc[category][title] = _cur;

      return acc;
   },

   setAction: {
      markIncomplete(payload: iCompliancePayload) : TaskAction {
         return {
            type: "RESET",
            payload: payload,
         };
      },

      markForReview(payload: iCompliancePayload) : TaskAction {
         return {
            type: "FORREVIEW",
            payload: payload,
         };
      },

      markBlocked(payload: iCompliancePayload) : TaskAction {
         return {
            type: "FORREVIEW",
            payload: { isBlocked: true, ...payload },
         };
      },

      markComplete(payload: iCompliancePayload) : TaskAction {
         return {
            type: "COMPLETE",
            payload: payload,
         };
      },

      markFailed(payload: iCompliancePayload) : TaskAction {
         return {
            type: "COMPLETE",
            payload: { isFailed: true, ...payload },
         };
      },

      markFixed(payload: iCompliancePayload) : TaskAction {
         return {
            type: "COMPLETE",
            payload: { isFixed: true, ...payload },
         };
      },

      addComment(payload: iCommentPayload) : CommentAction {
         return {
            type: "ADDCOMMENT",
            payload: payload,
         };
      },

      deleteComment(payload: iCommentRemovalPayload) : CommentAction {
         return {
            type: "DELETECOMMENT",
            payload: payload,
         };
      },
   },

   dispatch: function (state: iTasksByCategory, action : StoreAction ) : iTasksByCategory {
      
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
         isFixed: false,
         isBlocked: false,
         isFailed: false,
      };

      switch (action.type) {
         case "FORREVIEW":
            if (compliance["reviewer"]) {
               // Resetting from 'complete'
               reset("reviewer", "isFixed", "isFailed");
            } else {
               if (validatePayload("worker")) {
                  // Advancing from 'incomplete'
                  updateWorker();
                  updateIsBlocked();
               }
            }

            updateStatus("forReview");

            break;

         case "COMPLETE":
            if (validatePayload("worker", "reviewer")) {
               updateWorker();
               updateReviewer();
               updateWorkerFlag();
               updateIsFailed();
               updateStatus("complete");
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
         compliance["isFixed"] = getValidatedBool("isFixed");
      }

      function updateIsBlocked() {
         compliance["isBlocked"] = getValidatedBool("isBlocked");
      }

      function updateIsFailed() {
         compliance["isFailed"] = getValidatedBool("isFailed");
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
            ["incomplete", "forReview", "complete"].includes(status)
         ) {
            return status;
         } else {
            throw new Error(
               "validateStatus() : status not recognised"
            );
         }
      }

      function getValidatedBool(key) {
         return p[key] && "boolean" === typeof p[key]
            ? p[key]
            : getDefault(key);
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

      function mergeComplianceWithState() : iTasksByCategory {
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
   },
};

export default compliance;
