const todoActions: TodoActions = {
  stateSetter: undefined,

  init(stateSetter) {
    this.stateSetter = stateSetter;
  },

  setDoer: function (todo, doer) {
    todo["doer"] = doer;
    return todo;
  },

  setReviewer: function (todo, reviewer) {
    todo["reviewer"] = reviewer;
    return todo;
  },

  setComplete: function (todo, complete) {
    todo["isComplete"] = complete;
    return todo;
  },

  setFail: function (todo, fail) {
    todo["isFailed"] = fail;
    return todo;
  },

  setFlag: function (todo, flag) {
    todo["doerFlag"] = flag;
    return todo;
  },
  setProblem: function (todo, problem) {
    todo["hasProblem"] = problem;
    return todo;
  },

  markForReview: function (title, type, doer) {
    this.stateSetter((state) => {
      let todo = state[type][title];
      todo = this.setDoer(todo, doer);
      return { ...state };
    });
  },

  complete: function (title, type, doer, reviewer) {
    this.stateSetter((state) => {
      let todo = state[type][title];
      todo = this.setDoer(todo, doer);
      todo = this.setReviewer(todo, reviewer);
      todo = this.setComplete(todo, true);
      todo = this.setFail(todo, false);
      return { ...state };
    });
  },

  problemize: function (title, type, doer, problem = true) {
    this.stateSetter((state) => {
      let todo = state[type][title];
      todo = this.setDoer(todo, doer);
      todo = this.setProblem(todo, problem);
      return { ...state };
    });
  },
  fail: function (title, type, doer, reviewer) {
    this.stateSetter((state) => {
      let todo = state[type][title];
      todo = this.setDoer(todo, doer);
      todo = this.setReviewer(todo, reviewer);
      todo = this.setComplete(todo, false);
      todo = this.setFail(todo, true);
      return { ...state };
    });
  },

  flagDoer: function (title, type, flag = true) {
    this.stateSetter((state) => {
      let todo = state[type][title];
      todo = this.setFlag(todo, flag);
      return { ...state };
    });
  },

  reset: function (title, type, key) {
    this.stateSetter((state) => {
      let todo = state[type][title];

      if (key) {
        const k = key.charAt(0).toUpperCase() + key.slice(1);

        switch (key) {
          case "doer":
          case "reviewer":
            todo = this["set" + k](todo, "");
            break;

          case "fail":
          case "complete":
          case "flag":
            todo = this["set" + k](todo, false);
            break;

          default:
            throw new Error();
            break;
        }
      } else {
        todo["isFailed"] = todo["isComplete"] = todo[
          "doerFlag"
        ] = false;
        todo["doer"] = todo["reviewer"] = "";
      }

      return { ...state };
    });
  },
};

export default todoActions;
