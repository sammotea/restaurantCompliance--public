// Task

interface TaskRaw {
   title: string;
   category: string;
   subtasks?: string[];
}

interface Task extends TaskRaw {
   compliance: ComplianceParams;
}

// Grouped Tasks

type TasksByStatus = {
   [status in CoreStatusOptions]: Task[] | [];
}

interface TasksByCategory {
   [k: string]:  Task[]
}

// Task Parts

interface ComplianceParams {
   isBlocked: boolean;
   isFailed: boolean;
   isFixed: boolean;
   worker: string;
   reviewer: string;
   status: CoreStatusOptions;
   comments: Comment[]
}

// Compliance Parts

type CoreStatusOptions = "incomplete" | "forReview" | "complete";
type PseudoStatusOptions = 'blocked' | 'fixed' | 'failed';
type AllStatusOptions = CoreStatusOptions | PseudoStatusOptions;

interface Comment {
   id: number;
   author: string;
   comment: string;
}

// Payloads

type TaskMethods = "FORREVIEW" | "COMPLETE" | "RESET";
type CommentMethods = "ADDCOMMENT" | "DELETECOMMENT";

interface PayloadRequirements {
   taskId: string;
   taskCat: string;
}

interface DeleteCommentPayload extends PayloadRequirements {
   commentId: number;
}

interface AddCommentPayload extends PayloadRequirements {
   commentAuthor: string;
   commentText: string;
}

interface TaskPayload extends PayloadRequirements, Omit<Partial<ComplianceParams>, 'comments'> {}

type CommentPayload = DeleteCommentPayload | AddCommentPayload;
type Payloads = CommentPayload | TaskPayload;

interface TaskAction {
    type: TaskMethods;
    payload: TaskPayload;
}

interface CommentAction {
    type: CommentMethods;
    payload: CommentPayload;
}

type DispatchActions = TaskAction | CommentAction;