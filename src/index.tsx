import React, { useState } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import parser from "./_helpers/taskParser";
import Todos from "./_components/Todos";

const ComplianceList: React.FC = () => {
  const [tasks, setTasks] = useState(parser.parse(taskJson["tasks"]));

  const todoActions: TodoActions = {
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

    markForReview: function (title, type, doer) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setDoer(todo, doer);
        return { ...state };
      });
    },

    complete: function (title, type, doer, reviewer) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setDoer(todo, doer);
        todo = this.setReviewer(todo, reviewer);
        todo = this.setComplete(true, todo);
        todo = this.setFail(false, todo);
        return { ...state };
      });
    },

    fail: function (title, type, doer, reviewer) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setDoer(todo, doer);
        todo = this.setReviewer(todo, reviewer);
        todo = this.setCompletion(true, todo);
        return { ...state };
      });
    },

    flagDoer: function (title, type, flag = true) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setFlag(flag, todo);
        return { ...state };
      });
    },

    reset: function (title, type, key) {
      setTasks((state) => {
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

  function renderTodos() {
    if (Object.keys(tasks).length !== 0) {
      return <Todos tasksByType={tasks} handlers={todoActions} />;
    }
  }

  return <>{renderTodos()}</>;
};
render(<ComplianceList />, document.getElementById("root"));
