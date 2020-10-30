const actionSetter = {
   markIncomplete(payload) {
      return {
         type: "RESET",
         payload: payload,
      };
   },

   markForReview(payload) {
      return {
         type: "FORREVIEW",
         payload: payload,
      };
   },

   markBlocked(payload) {
      return {
         type: "FORREVIEW",
         payload: { isBlocked: true, ...payload },
      };
   },

   markComplete(payload) {
      return {
         type: "COMPLETE",
         payload: payload,
      };
   },

   markFailed(payload) {
      return {
         type: "COMPLETE",
         payload: { isFailed: true, ...payload },
      };
   },

   markFixed(payload) {
      return {
         type: "COMPLETE",
         payload: { isFixed: true, ...payload },
      };
   },

   addComment(payload) {
      return {
         type: "ADDCOMMENT",
         payload: payload,
      };
   },

   deleteComment(payload) {
      return {
         type: "DELETECOMMENT",
         payload: payload,
      };
   },
};

export default actionSetter;
