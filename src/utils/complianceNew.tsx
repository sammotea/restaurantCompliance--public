import pseudoUid from "./random";

// PENDING
// 1. FORREVIEW = SETFORREVIEW

const compliance = {
    statusOptions: ["incomplete", "forReview", "complete"],

    taskDefaults: {
        worker: "",
        reviewer: "",
        status: "incomplete",
        isBlocked: false,
        isFailed: false,
        isFixed: false,
        comments: [],
    } as ComplianceParams,

    addDefaults: function (acc: iTask[], cur: _iTask): iTask[] {
        const defaults = compliance.taskDefaults;
        const task = { ...cur, ...{ compliance: defaults } };

        acc.push(task);

        return acc;
    },

    prepForStore: function (
        acc: iTasksByCategory,
        cur: iTask
    ): iTasksByCategory {
        const _cur = { ...cur };
        const { title, category } = _cur;

        acc[category] = acc[category] || {};
        acc[category][title] = _cur;

        return acc;
    },

    setAction: {
        markIncomplete(payload: iCompliancePayload): TaskAction {
            return {
                type: "RESET",
                payload: payload,
            };
        },

        markForReview(payload: iCompliancePayload): TaskAction {
            return {
                type: "FORREVIEW",
                payload: payload,
            };
        },

        markBlocked(payload: iCompliancePayload): TaskAction {
            return {
                type: "FORREVIEW",
                payload: { isBlocked: true, ...payload },
            };
        },

        markComplete(payload: iCompliancePayload): TaskAction {
            return {
                type: "COMPLETE",
                payload: payload,
            };
        },

        markFailed(payload: iCompliancePayload): TaskAction {
            return {
                type: "COMPLETE",
                payload: { isFailed: true, ...payload },
            };
        },

        markFixed(payload: iCompliancePayload): TaskAction {
            return {
                type: "COMPLETE",
                payload: { isFixed: true, ...payload },
            };
        },

        addComment(payload: iCommentPayload): CommentAction {
            return {
                type: "ADDCOMMENT",
                payload: payload,
            };
        },

        deleteComment(payload: iCommentRemovalPayload): CommentAction {
            return {
                type: "DELETECOMMENT",
                payload: payload,
            };
        },
    },

    dispatch: function (
        state: iTasksByCategory,
        action: DispatchActions
    ): iTasksByCategory {
        // Early exit if anything’s missing
        if (!compliance.hasValidPayload(action)) {
            throw new Error("compliance.dispatch() : Invalid payload");
        }

        const { type: actionType, payload } = action;
        const { taskId, taskCat } = payload;
        const complianceObj = state[taskCat][taskId]["compliance"];
        let complianceChanges: Partial<ComplianceParams>;

        console.log(action);

        // Filter based on action type
        if ("commentId" in payload || "commentText" in payload) {
            complianceChanges = compliance.doCommentAction(
                actionType as CommentMethods,
                payload,
                complianceObj
            );
        } else {
            complianceChanges = compliance.doTaskAction(
                actionType as TaskMethods,
                payload,
                complianceObj
            );
        }

        const updatedCompliance: ComplianceParams = {
            ...complianceObj,
            ...complianceChanges,
        };

        return compliance.mergeUpdatesWithState(
            state,
            updatedCompliance,
            taskId,
            taskCat
        );
    },

    mergeUpdatesWithState: function (
        state: iTasksByCategory,
        updatedCompliance: ComplianceParams,
        taskId: string,
        taskCat: string
    ): iTasksByCategory {
        return {
            ...state,
            [taskCat]: {
                ...state[taskCat],
                [taskId]: {
                    ...state[taskCat][taskId],
                    compliance: updatedCompliance,
                },
            },
        };
    },

    doTaskAction: function (
        actionType: TaskMethods,
        payload: TaskPayload,
        complianceObj: ComplianceParams
    ): Partial<ComplianceParams> {
        let complianceUpdates = {} as Partial<ComplianceParams>;

        switch (actionType) {
            case "FORREVIEW":
                // If already has a reviewer in state we must be resetting from 'complete'
                if (complianceObj["reviewer"]) {
                    complianceUpdates = compliance.getDefaults([
                        "reviewer",
                        "isFixed",
                        "isFailed",
                    ]);
                } else {
                    complianceUpdates = compliance.updateTask(
                        ["worker", "isBlocked"],
                        payload,
                        complianceObj
                    );
                }

                complianceUpdates["status"] = "forReview";

                break;

            case "COMPLETE":
                complianceUpdates = compliance.updateTask(
                    ["worker", "reviewer", "isBlocked", "isFailed", "isFixed"],
                    payload,
                    complianceObj
                );

                complianceUpdates["status"] = "complete";
                break;

            case "RESET":
                complianceUpdates = compliance.getDefaults();
                break;

            default:
                throw new Error(
                    `compliance.doTaskAction() : Unrecognised actionType [${actionType}].`
                );
        }

        return complianceUpdates;
    },

    getDefaults: function (
        keyArray?: Array<keyof ComplianceParams>
    ): Partial<ComplianceParams> {
        if (keyArray) {
            let defaults = {} as Partial<ComplianceParams>;

            keyArray.forEach((k) => {
                let assignation = {
                    [k]: compliance.taskDefaults[k],
                };
                defaults = { ...defaults, ...assignation };
            });

            return defaults;
        } else {
            return compliance.taskDefaults;
        }
    },

    updateTask: function (
        keysArr: Array<keyof ComplianceVariables>,
        payload: TaskPayload,
        complianceObj: ComplianceParams
    ): Partial<ComplianceParams> {
        let updates = {} as Partial<ComplianceParams>;

        keysArr.forEach((k) => {
            // Skip 'comments' param on ComplianceParms
            if (k === "comments") return;

            let assignation = {
                [k]: payload[k],
            };
            updates = { ...updates, ...assignation };
        });

        return { ...complianceObj, ...updates };
    },

    doCommentAction: function (
        actionType: CommentMethods,
        payload: CommentPayload,
        complianceObj: ComplianceParams
    ): Partial<ComplianceParams> {
        let comments = complianceObj["comments"];

        switch (actionType) {
            case "ADDCOMMENT":
                if ("commentAuthor" in payload && "commentText" in payload) {
                    const { commentAuthor, commentText } = payload;
                    comments.push(
                        compliance.createComment(commentAuthor, commentText)
                    );
                }

                break;

            case "DELETECOMMENT":
                if ("commentId" in payload) {
                    const { commentId } = payload;
                    comments = compliance.deleteComment(commentId, comments);
                }

                break;

            default:
                throw new Error(
                    `compliance.doCommentAction() : actionType not recognised [${actionType}]`
                );
        }

        return { comments: comments };
    },

    createComment: function (author: string, commentText: string): Comment {
        return {
            id: pseudoUid(),
            author: author,
            comment: commentText,
        };
    },

    deleteComment: function (
        commentId: number,
        commentsArr: Comment[]
    ): Comment[] {
        if (commentsArr.length) {
            let commentFound = false;
            const updatedComments = commentsArr.filter((comment) => {
                if (commentId === comment.id) {
                    commentFound = true;
                    return false;
                } else {
                    return true;
                }
            });

            if (!commentFound) {
                throw new Error(
                    `compliance.deleteComment() : comment [id: ${commentId}] not found.`
                );
            }

            return updatedComments;
        } else {
            throw new Error(
                `compliance.deleteComment() : there are no comments on compliance task.`
            );
        }
    },

    hasValidPayload: function (action: DispatchActions): boolean {
        const { payload } = action;
        const { taskId, taskCat, ...complianceObj } = payload;
        let isValid = true;

        // Basic payload scaffold check
        if (!payload || !taskId || !taskCat) {
            throw new Error(
                "compliance.dispatch() : No payload or missing details"
            );
        }

        // Expected types for compliance params
        for (const [k, v] of Object.entries(complianceObj)) {
            switch (k) {
                case "commentAuthor":
                case "commentText":
                case "commentId":
                    isValid = compliance.validateCommentMeta(k, v);
                    break;

                case "status":
                    isValid = compliance.validateStatus(v);
                    break;

                case "worker":
                case "reviewer":
                    isValid = v && compliance.validateFromDefaults(k, v);
                    break;

                case "isFixed":
                case "isBlocked":
                case "isFailed":
                    isValid = compliance.validateFromDefaults(k, v);
                    break;

                default:
                    throw new Error(
                        `compliance.isValidPayloadTypes() : key not recognised [${k}]`
                    );
            }

            if (!isValid) break;
        }

        return isValid;
    },

    // isValidPayload: function (action: TaskAction | CommentAction): boolean {
    //     if (action.payload && action.payload.taskId && action.payload.taskCat) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // },

    // isValidPayloadTypes: function (payload: PayloadTypes): boolean {
    //     let isValid = true;

    //     for (const [k, v] of Object.entries(payload)) {
    //         switch (k) {
    //             case "commentAuthor":
    //             case "commentText":
    //             case "commentId":
    //                 isValid = compliance.validateCommentMeta(k, v);
    //                 break;

    //             case "status":
    //                 isValid = compliance.validateStatus(v);
    //                 break;

    //             case "worker":
    //             case "reviewer":
    //                 isValid = v && compliance.validateFromDefaults(k, v);
    //                 break;

    //             case "isFixed":
    //             case "isBlocked":
    //             case "isFailed":
    //                 isValid = compliance.validateFromDefaults(k, v);
    //                 break;

    //             default:
    //                 throw new Error(
    //                     `compliance.isValidPayloadTypes() : key not recognised [${k}]`
    //                 );
    //         }

    //         if (!isValid) break;
    //     }

    //     return isValid;
    // },

    validateCommentMeta: function (
        metaKey: string,
        metaValue: string | number
    ): boolean {
        switch (metaKey) {
            case "commentAuthor":
            case "commentText":
                return "string" === typeof metaValue;
                break;

            case "commentId":
                return "number" === typeof metaValue;
                break;

            default:
                throw new Error(
                    `compliance.validateCommentMeta() : key not recognised [${metaKey}]`
                );
        }
    },

    validateStatus: function (status: string): boolean {
        if (compliance.statusOptions.includes(status)) {
            return true;
        } else {
            throw new Error(
                `compliance.validateStatus() : status not recognised [${status}]`
            );
        }
    },

    // PENDING: value should be union of ComplianceVariables possible types
    validateFromDefaults: function (
        key: keyof ComplianceVariables,
        value: any
    ): boolean {
        if (typeof value === typeof compliance.taskDefaults[key]) {
            return true;
        } else {
            throw new Error(
                `compliance.validateFromDefaults() : type not recognised [${key} : ${value}]`
            );
        }
    },
};
export default compliance;
