const todoActions: TodoActions = {
   stateSetter: undefined,

   init(stateSetter) {
      this.stateSetter = stateSetter;
   },

   setStatus: function (todo, status) {
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
      }
      todo["compliance"]["status"] = status;
      return todo;
   },

   setworker: function (todo, worker) {
      todo["compliance"]["worker"] = worker;
      return todo;
   },

   setReviewer: function (todo, reviewer) {
      todo["compliance"]["reviewer"] = reviewer;
      return todo;
   },

   setflagWorker: function (todo, flag) {
      todo["compliance"]["flagWorker"] = flag;
      return todo;
   },

   forReview: function (title, type, worker, isBlocked = false) {
      this.stateSetter((state) => {
         let todo = state[type][title];
         const status = isBlocked ? "blocked" : "forReview";
         todo = this.setworker(todo, worker);
         todo = this.setStatus(todo, status);
         console.log(todo.compliance);
         return { ...state };
      });
   },

   isComplete: function (
      title,
      type,
      worker,
      reviewer,
      flagWorker = false
   ) {
      this.stateSetter((state) => {
         let todo = state[type][title];
         todo = this.setworker(todo, worker);
         todo = this.setReviewer(todo, reviewer);
         todo = this.setStatus(todo, "complete");

         if (flagWorker) {
            todo = this.setflagWorker(true);
         }

         return { ...state };
      });
   },

   isFailed: function (title, type, worker, reviewer) {
      this.stateSetter((state) => {
         let todo = state[type][title];
         todo = this.setworker(todo, worker);
         todo = this.setReviewer(todo, reviewer);
         todo = this.setStatus(todo, "failed");
         return { ...state };
      });
   },

   reset: function (title, type, key) {
      this.stateSetter((state) => {
         let todo = state[type][title];

         if (key) {
            const k = key.charAt(0).toUpperCase() + key.slice(1);
            switch (key) {
               case "status":
                  todo = this["set" + k](todo, "pending");
                  break;

               case "worker":
               case "reviewer":
                  todo = this["set" + k](todo, "");
                  break;

               case "flagWorker":
                  todo = this["set" + k](todo, false);
                  break;

               default:
                  throw new Error();
                  break;
            }
         } else {
            this.setStatus(todo, "pending");
            this.setworker(todo, "");
            this.setReviewer(todo, "");
            this.setflagWorker(todo, false);
         }
         return { ...state };
      });
   },
};

export default todoActions;
