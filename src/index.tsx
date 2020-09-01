import React, { useState } from "react";
import { render } from "react-dom";
import taskJson from "./_data/tasks.json";
import User from "./_data/user";
import parser from "./_helpers/taskParser";
import Todos from "./_components/Todos";

const ComplianceList: React.FC = () => {
  const [tasks, setTasks] = useState(parser.parse(taskJson["tasks"]));
  const [user, setUser] = useState("notManager");
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
    setProblem: function (todo, problem) {
      todo["hasProblem"] = problem;
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
        todo = this.setComplete(todo, true);
        todo = this.setFail(todo, false);
        return { ...state };
      });
    },

    problemize: function (title, type, doer, problem = true) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setDoer(todo, doer);
        todo = this.setProblem(todo, problem);
        return { ...state };
      });
    },
    fail: function (title, type, doer, reviewer) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setDoer(todo, doer);
        todo = this.setReviewer(todo, reviewer);
        todo = this.setComplete(todo, false);
        todo = this.setFail(todo, true);
        return { ...state };
      });
    },

    flagDoer: function (title, type, flag = true) {
      setTasks((state) => {
        let todo = state[type][title];
        todo = this.setFlag(todo, flag);
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
      return (
        <User.Provider value={user}>
          <Todos tasksByType={tasks} handlers={todoActions} />
        </User.Provider>
      );
    }
  }

  function renderUserSwitch() {
    return (
      <button
        onClick={() => {
          if (user === "notManager") {
            setUser("manager");
          } else {
            setUser("notManager");
          }
        }}
      >
        USER = {user}
      </button>
    );
  }

  return (
    <>
      {renderUserSwitch()}
      {renderTodos()}
    </>
  );
};
render(<ComplianceList />, document.getElementById("root"));
