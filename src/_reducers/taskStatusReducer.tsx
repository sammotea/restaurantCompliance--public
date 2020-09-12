const taskStatusReducer = {
   limited(acc, cur) {
      const status = cur.compliance.status;
      const isDone = "complete" === status || "failed" === status;

      // Workers see tasks they have done awaiting review as Pending.
      if (!isDone) {
         acc["Pending"].push(cur);
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
            view = "ForReview";
         } else {
            view = "Pending";
         }
      } else {
         view = "Done";
      }

      acc[view].push(cur);
      return acc;
   },
};

export default taskStatusReducer;
