import React, { useState, useReducer } from "react";
import { render } from "react-dom";

import taskJson from "./data/tasks.json";

import User from "./contexts/user";
import Permission from "./contexts/permission";
import Dispatch from "./contexts/dispatch";
import CurrentView from "./contexts/currentView";

import compliance from "./utils/compliance";

import Header from "./components/Header";
import Views from "./components/Header/Views";
import Controller from "./components/Tasks/Controller";
import UserSwitch from "./components/Header/UserSwitch";

const ComplianceTasks: React.FC = () => {
    const [user, setUser] = useState("manager");
    const [currentView, setCurrentView] =
        useState<CoreStatusOptions>("incomplete");
    const [store, dispatch] = useReducer(
        compliance.dispatch,
        transformTasksForStore()
    );
    const tasksByStatus = organiseTasksByStatus(store);
    const canReview = checkCanReview(user);
    return (
        <User.Provider value={user}>
            <Dispatch.Provider value={dispatch}>
                <Permission.Provider value={canReview}>
                    <CurrentView.Provider value={currentView}>
                        <div
                            className={`c-compliance s--${currentView} ${
                                canReview ? "s--canReview" : ""
                            }`}
                        >
                            {renderHeader()}
                            {renderTasks()}
                        </div>
                    </CurrentView.Provider>
                </Permission.Provider>
            </Dispatch.Provider>
        </User.Provider>
    );

    function transformTasksForStore(): TasksByCategory {
        const tasksRaw = [...taskJson["tasks"]] as TaskRaw[];
        const tasksRawWithDefaults = [...tasksRaw].reduce(
            compliance.addDefaults,
            []
        ) as Task[];
        const tasksStore = tasksRawWithDefaults.reduce(
            compliance.prepForStore,
            {}
        ) as TasksByCategory;
        console.log(tasksStore);
        return tasksStore;
    }

    function organiseTasksByStatus(fromStore: TasksByCategory): TasksByStatus {
        const incomplete = [];
        const forReview = [];
        const complete = [];

        for (const category in fromStore) {
            for (const taskId in fromStore[category]) {
                const task = fromStore[category][taskId];
                const status = task.compliance.status;

                switch (status) {
                    case "incomplete":
                        incomplete.push(task);
                        break;

                    case "forReview":
                        forReview.push(task);
                        break;

                    case "complete":
                        complete.push(task);
                        break;

                    default:
                        throw new Error(
                            `ComplianceTasks.organiseTasksByStatus() : status not recognised [${status}]`
                        );
                }
            }
        }

        return {
            incomplete,
            forReview,
            complete,
        };
    }

    function renderHeader() {
        return (
            <Header>
                <nav className="c-nav">
                    <UserSwitch user={user} hUserSwitch={hUserSwitch} />
                </nav>
                <Views hUpdateView={setCurrentView} />
            </Header>
        );
    }

    function hUserSwitch(u: string) {
        setUser(u);

        if (!checkCanReview(u)) {
            setCurrentView("incomplete");
        }
    }

    function checkCanReview(u: string) {
        return u === "manager" ? true : false;
    }

    function renderTasks() {
        if (Object.keys(tasksByStatus).length !== 0) {
            return (
                <Controller
                    tasksByStatusObj={tasksByStatus}
                    view={currentView}
                />
            );
        }
    }
};

render(<ComplianceTasks />, document.getElementById("root"));
