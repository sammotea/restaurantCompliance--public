import React, { useContext } from "react";
import User from "../../../../contexts/user";
import Dispatch from "../../../../contexts/dispatch";
import avatars from "../../../../maps/avatars";
import transformers from "../../../../utils/transformers";
import compliance from "../../../../utils/compliance";

// Pending: Worker can view manager comments if switch permissions while comments open

interface Props {
    comments: Comment[];
    taskId: string;
    taskCat: string;
}

const Comments: React.FC<Props> = ({
    comments: commentsArr,
    taskId,
    taskCat,
}) => {
    const user = useContext(User);
    const dispatch = useContext(Dispatch);

    return <>{renderComments()}</>;

    function renderComments() {
        if (commentsArr.length) {
            return (
                <ul className="c-comments">{commentsArr.map(getComment)}</ul>
            );
        }
    }

    function getComment(commentObj: Comment) {
        const { author, comment, id } = commentObj;
        const isUsersOwnComment = user === author ? true : false;
        const canEdit = isUsersOwnComment;

        return (
            <li key={id} className="c-comment">
                {renderAvatar(author)}
                <div className="c-comment__author">
                    {isUsersOwnComment ? "You" : author} wrote:
                </div>

                <div className="c-comment__text">{comment}</div>

                {canEdit && renderActions(id)}
            </li>
        );
    }

    function renderAvatar(author: string) {
        const avatar = avatars[author] ? avatars[author] : "robot";
        const cl = `c-comment__avatar c-comment__avatar--${transformers.toCamel(
            avatar
        )}`;

        return <div className={cl}></div>;
    }

    function renderActions(commentId: number) {
        return (
            <ul className="c-comment__actions">
                <li
                    className="c-comment__action c-comment__action--delete"
                    onClick={() => hActionClick("delete", commentId)}
                >
                    Delete
                </li>
            </ul>
        );
    }

    function hDelete(commentId: number) {
        const payload = {
            taskId: taskId,
            taskCat: taskCat,
            commentId: commentId,
        };

        if (dispatch) dispatch(compliance.setAction.deleteComment(payload));
    }

    function hActionClick(actionType: string, commentId: number) {
        switch (actionType) {
            case "delete":
                hDelete(commentId);
                break;

            default:
                break;
        }
    }
};

export default Comments;
