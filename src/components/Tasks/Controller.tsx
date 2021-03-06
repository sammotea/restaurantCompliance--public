import React, { useContext } from "react";

import Permission from "../../contexts/permission";

import Categories from "./Categories";
import NoTasks from "./Task/NoTasks";

interface Props {
    tasksByStatusObj: TasksByStatus;
    view: CoreStatusOptions;
}

const Controller: React.FC<Props> = ({ tasksByStatusObj, view }) => {
    const canReview = useContext(Permission);

    // Limited view is only for incomplete tasks
    if (!canReview && view !== "incomplete") return <></>;

    return <>{renderView()}</>;

    function renderView() {
        const tasksArr = getTasks();

        if (tasksArr.length) {
            return <Categories tasksArr={tasksArr} view={view} />;
        } else {
            return <NoTasks view={view} />;
        }
    }

    function getTasks(): Task[] {
        if (canReview) {
            return tasksByStatusObj.hasOwnProperty(view)
                ? tasksByStatusObj[view]
                : [];
        } else {
            let tArr: Task[] = [];
            const limitedViews: CoreStatusOptions[] = [
                "incomplete",
                "forReview",
            ];

            // Limited view has these merged in to the only visible section
            limitedViews.forEach((view) => {
                if (tasksByStatusObj.hasOwnProperty(view)) {
                    tArr = tArr.concat(tasksByStatusObj[view]);
                }
            });

            return tArr;
        }
    }
};

export default Controller;
