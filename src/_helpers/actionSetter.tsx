const actionSetter = {
   forReview(payload) {
      return {
         type: "AWAITINGREVIEW",
         payload: payload,
      };
   },

   fail(payload) {
      return {
         type: "FAILED",
         payload: payload,
      };
   },

   complete(payload) {
      return {
         type: "COMPLETE",
         payload: payload,
      };
   },

   reset(payload) {
      return {
         type: "RESET",
         payload: payload,
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
