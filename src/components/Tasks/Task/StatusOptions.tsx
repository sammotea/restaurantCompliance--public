import React, { useContext } from "react";
import Permission from "../../../contexts/permission";
import CurrentView from "../../../contexts/currentView";
import User from "../../../contexts/user";
import Dispatch from "../../../contexts/dispatch";
import transformers from "../../../utils/transformers";
import compliance from "../../../utils/compliance";

interface Props {
    task: Task;
    hStatusChange(): void;
}

type iconOptions = "incomplete" | "complete" | "fixed" | "failed" | "undo";

const StatusOptions: React.FC<Props> = ({ task, hStatusChange }) => {
    const {
        title,
        category,
        compliance: {
            worker,
            reviewer,
            status: currentStatus,
            isBlocked,
            isFailed,
            isFixed,
        },
    } = task;
    const user = useContext(User);
    const canReview = useContext(Permission);
    const currentView = useContext(CurrentView);
    const dispatch = useContext(Dispatch);

    return <>{renderStatusOptions()}</>;

    function renderStatusOptions() {
        const statusOptions = getStatusOptions();

        return (
            <ul className={`c-taskOptions--status`}>
                {statusOptions.map((statusOption) => {
                    const isSelected = checkIsCurrentStatus(statusOption);
                    const action = getActionFromStatus(statusOption);
                    const cl = `c-taskOption--status c-taskOption--${statusOption} ${
                        isSelected ? "s--isSelected" : ""
                    }`;

                    return (
                        <li
                            key={statusOption}
                            className={cl}
                            onClick={(e) => hStatusClick(action)}
                        >
                            <span
                                className={`c-icon c-icon--${statusOption}`}
                            ></span>
                        </li>
                    );
                })}
            </ul>
        );
    }

    function getStatusOptions(): iconOptions[] {
        switch (currentView) {
            case "incomplete":
                return orderOptions(["incomplete", "complete", "failed"]);

            case "forReview":
            case "complete":
                return orderOptions(["complete", "failed", "fixed", "undo"]);

            default:
                throw new Error("getStatusOptions: unrecognised view");
        }
    }

    function checkIsCurrentStatus(statusOption: iconOptions): boolean {
        let isSelected = false;

        /**
         *    Being explicit: if there is a simpler, more robust
         *    way of writing this logic I have failed to find it.
         */

        switch (currentStatus) {
            case "incomplete":
                isSelected = currentStatus === statusOption;
                break;

            case "forReview":
                if (!canReview) {
                    // "Complete" and awaiting review
                    if (statusOption === "complete" && !isBlocked) {
                        isSelected = true;
                    }

                    // "Failed" and awaiting review
                    if (statusOption === "failed" && isBlocked) {
                        isSelected = true;
                    }
                }

                break;

            case "complete":
                // Done
                if (statusOption === "complete" && !isFailed && !isFixed) {
                    isSelected = true;
                }

                // Failed
                if (statusOption === "failed" && isFailed) {
                    isSelected = true;
                }

                // Fixed
                if (statusOption === "fixed" && isFixed) {
                    isSelected = true;
                }

                break;
        }

        return isSelected;
    }

    function getActionFromStatus(statusOption: iconOptions): string {
        let action;

        switch (statusOption) {
            case "incomplete":
            case "fixed":
                action = statusOption;
                break;

            case "complete":
                if (!canReview) {
                    action = "forReview";
                }
                break;

            case "failed":
                if (!canReview) {
                    action = "blocked";
                }
                break;

            case "undo":
                if (currentStatus === "forReview") {
                    action = "incomplete";
                } else if (currentStatus === "complete") {
                    if (worker !== reviewer) {
                        if (isBlocked) {
                            action = "blocked";
                        } else {
                            action = "forReview";
                        }
                    } else {
                        action = "incomplete";
                    }
                }
                break;

            default:
                throw new Error(
                    `StatusOptions.getActionFromStatuses() : unrecognised statusOption [${statusOption}].`
                );
        }

        return transformers.toCamel("mark " + action);
    }

    function orderOptions(options: iconOptions[]): iconOptions[] {
        const statusOrder = {
            incomplete: 1,
            complete: 101,
            fixed: 1001,
            failed: 1002,
            undo: 10001,
        };

        return options.sort((a, b) => {
            return statusOrder[a] - statusOrder[b];
        });
    }

    function hStatusClick(action: string) {
        let payload;
        const payloadRequirements = {
            taskId: title,
            taskCat: category,
        };

        if (!dispatch) {
            return;
        }

        /**
         ***   NB: Actions can be progressive (incomplete -> complete)
         ***   or regressive (complete -> forReview).
         **/

        switch (action) {
            case "markIncomplete":
                dispatch(compliance.setAction[action](payloadRequirements));
                break;

            case "markBlocked":
            case "markForReview":
                /**
                 ***   For progress we mark as user, otherwise
                 ***   we keep it unchanged (i.e. don’t change
                 ***   the worker if the reviewer is undoing a
                 ***   mismarked-completed task.)
                 **/
                dispatch(
                    compliance.setAction[action]({
                        ...payloadRequirements,
                        worker: worker ? worker : user,
                    })
                );
                break;

            case "markFixed":
            case "markFailed":
            case "markComplete":
                dispatch(
                    compliance.setAction[action]({
                        ...payloadRequirements,
                        worker: worker ? worker : user,
                        reviewer: user,
                    })
                );
                break;

            default:
                throw new Error("hStatusChange: status not recognised");
        }

        hStatusChange();
    }
};

export default StatusOptions;
