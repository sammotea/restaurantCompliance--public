import React, { useContext } from "react";
import Permission from "../../../contexts/permission";
import CurrentView from "../../../contexts/currentView";
import User from "../../../contexts/user";
import Dispatch from "../../../contexts/dispatch";
import transformers from "../../../utils/transformers";
import compliance from "../../../utils/complianceNew";

interface Props {
    task: iTask;
    hStatusChange(): void;
}

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

    function getStatusOptions(): string[] {
        const statusOptions = [];

        switch (currentView) {
            case "incomplete":
                statusOptions.push("incomplete", "complete", "failed");
                break;

            case "forReview":
            case "complete":
                statusOptions.push("complete", "failed", "fixed", "undo");
                break;

            default:
                throw new Error("getStatusOptions: unrecognised view");
        }

        return orderOptions(statusOptions);
    }

    function checkIsCurrentStatus(statusOption: string): boolean {
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
                } else {
                    isSelected = currentStatus === statusOption;
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

    function getActionFromStatus(statusOption: string): string {
        let action = statusOption;

        switch (statusOption) {
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
        }

        return transformers.toCamel("mark " + action);
    }

    function orderOptions(options: string[]): string[] {
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
        const payload = {
            taskId: title,
            taskCat: category,
        } as iCompliancePayload;

        /**
         ***   NB: Actions can be progressive (incomplete -> complete)
         ***   or regressive (complete -> forReview).
         **/

        switch (action) {
            case "markIncomplete":
                break;

            case "markBlocked":
            case "markForReview":
                /**
                 ***   For progress we mark as user, otherwise
                 ***   we keep it unchanged (i.e. don’t change
                 ***   the worker if the reviewer is undoing a
                 ***   mismarked-completed task.)
                 **/

                payload["worker"] = worker ? worker : user;
                break;

            case "markFixed":
            case "markFailed":
            case "markComplete":
                payload["worker"] = worker ? worker : user;
                payload["reviewer"] = user;
                break;

            default:
                throw new Error("hStatusChange: status not recognised");
        }

        dispatch(compliance.setAction[action](payload));

        hStatusChange();
    }
};

export default StatusOptions;
