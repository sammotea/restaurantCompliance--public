import React, { useState, useContext } from "react";

import Permission from "../../../contexts/permission";
import CurrentView from "../../../contexts/currentView";

import Face from "./Face";
import StatusOptions from "./StatusOptions";
import MetaOptions from "./MetaOptions";
import Meta from "./Meta/";

import History from "./Meta//History";
import Comments from "./Meta/Comments";
import CommentsForm from "./Meta/CommentsForm";
import Subtasks from "./Meta/Subtasks";

interface Props {
    task: Task;
    title: string;
}

const Task: React.FC<Props> = ({ task, title }) => {
    const {
        category,
        compliance: { worker, reviewer, status: currentStatus, comments },
        subtasks,
    } = task;

    const [showStatusOptions, setShowStatusOptions] = useState(false);
    const [showMetaOptions, setShowMetaOptions] = useState(false);
    const [showMeta, setShowMeta] = useState(false);
    const [currentMeta, setCurrentMeta] = useState("");

    const canReview = useContext(Permission);
    const currentView = useContext(CurrentView);

    return <>{renderTask()}</>;

    function renderTask() {
        return (
            <li
                key={title}
                className={`c-task c-task--${currentStatus} ${
                    showStatusOptions ? "s--showStatusOptions" : ""
                } ${showMetaOptions ? "s--showMetaOptions" : ""}`}
            >
                <div className={`c-task__header`}>
                    <Face
                        task={task}
                        hShowStatusOptions={hToggleShowStatusOptions}
                        hShowMetaOptions={hToggleShowMetaOptions}
                    />
                    <StatusOptions task={task} hStatusChange={hStatusChange} />
                    <MetaOptions
                        currentMeta={currentMeta}
                        hMetaChange={hMetaChange}
                    />
                </div>
                <div className={`c-task__body`}>{renderMeta()}</div>
            </li>
        );
    }

    function renderMeta() {
        if (showMeta && currentMeta) {
            const components = [];

            switch (currentMeta) {
                case "comments":
                    components.push(
                        <CommentsForm
                            key={"commentsForm"}
                            taskId={title}
                            taskCat={category}
                        />
                    );
                    components.push(
                        <Comments
                            key={"comments"}
                            taskId={title}
                            taskCat={category}
                            comments={comments}
                        />
                    );

                    break;

                case "info":
                    if (
                        currentStatus === "incomplete" ||
                        (currentView === "incomplete" && !canReview)
                    ) {
                        let subtasksArr = ["No info available"];

                        if (
                            "undefined" !== typeof subtasks &&
                            Array.isArray(subtasks)
                        ) {
                            subtasksArr = subtasks;
                        }
                        components.push(
                            <Subtasks
                                key={"subtasks"}
                                subtasksArr={subtasksArr}
                            />
                        );
                    } else {
                        if (canReview) {
                            components.push(
                                <History
                                    key={"history "}
                                    worker={worker}
                                    reviewer={reviewer}
                                />
                            );
                        }
                    }
            }

            return <Meta>{components}</Meta>;
        }
    }

    function hStatusChange() {
        hToggleShowStatusOptions();
    }

    function hMetaChange(metaOption: string) {
        setCurrentMeta(metaOption);
        setShowMeta(metaOption ? true : false);
    }

    function hToggleShowStatusOptions() {
        setShowMetaOptions(false);

        if (!showMetaOptions) {
            setShowStatusOptions(!showStatusOptions);
        }
    }

    function hToggleShowMetaOptions() {
        setShowStatusOptions(false);

        if (!showStatusOptions) {
            setShowMetaOptions(!showMetaOptions);
        }
    }
};

export default Task;
