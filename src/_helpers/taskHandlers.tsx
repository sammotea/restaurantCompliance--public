const taskHandlers = {
   markTaskForReview(payload, dispatch) {
      dispatch({
         type: "FORREVIEW",
         payload: payload,
      });
   },

   failTask(payload, dispatch) {
      dispatch({
         type: "FAILED",
         payload: payload,
      });
   },

   completeTask(payload, dispatch) {
      dispatch({
         type: "COMPLETE",
         payload: payload,
      });
   },

   resetTask: function (payload, dispatch) {
      dispatch({
         type: "RESET",
         payload: payload,
      });
   },

   addComment: function (payload, dispatch) {
      dispatch({
         type: "ADDCOMMENT",
         payload: payload,
      });
   },

   deleteComment: function (payload, dispatch) {
      dispatch({
         type: "DELETECOMMENT",
         payload: payload,
      });
   },
};

export default taskHandlers;
