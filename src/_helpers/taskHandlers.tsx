const taskHandlers = {
   setDispatch: function (dispatchMethod) {
      this.dispatch = dispatchMethod;
   },

   markTaskForReview(payload) {
      this.dispatch({
         type: "FORREVIEW",
         payload: payload,
      });
   },

   failTask(payload) {
      this.dispatch({
         type: "FAILED",
         payload: payload,
      });
   },

   completeTask(payload) {
      this.dispatch({
         type: "COMPLETE",
         payload: payload,
      });
   },

   resetTask: function (payload) {
      this.dispatch({
         type: "RESET",
         payload: payload,
      });
   },
};

export default taskHandlers;
