const taskStatusReducer = {
   limited(acc, cur) {
      const status = cur.compliance.status;
      const isDone = "complete" === status || "failed" === status;

      // Workers see tasks they have done awaiting review as Pending.
      if (!isDone) {
         acc["pending"].push(cur);
      }

      return acc;
   },
   full(acc, cur) {
      const status = cur.compliance.status;
      let view;

      const isDone = "complete" === status || "failed" === status;
      const needsReview =
         "forReview" === status || "blocked" === status;

      if (!isDone) {
         if (needsReview) {
            view = "forReview";
         } else {
            view = "pending";
         }
      } else {
         view = "done";
      }

      acc[view].push(cur);
      return acc;
   },
};

export default taskStatusReducer;
