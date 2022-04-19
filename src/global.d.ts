interface _iTask {
   title: string;
   category: string;
   subtasks?: string[];
}

interface ComplianceVariables {
   isBlocked: boolean;
   isFailed: boolean;
   isFixed: boolean;
   worker: string;
   reviewer: string;
   status: string;
   comments: Comment[];
}
interface _iComplianceVariables {
   isBlocked?: boolean;
   isFailed?: boolean;
   isFixed?: boolean;
   worker: string;
   reviewer: string;
}

interface iComplianceObj extends _iComplianceVariables {
   status: string;
   comments?: Comment[];
}

interface iTask extends _iTask {
   compliance: ComplianceParams;
}

interface iCommentObj {
   id: number;
   author: string;
   comment: string;
}

type iTasksByStatus = {
   [status in CoreStatusOptions]: iTask[] | [];
}

interface iTasksByCategory {
   [k: string]:  iTask[]
}

interface _iCompliancePayload {
   taskId: string;
   taskCat: string;
}

interface iCompliancePayload
   extends _iCompliancePayload,
      Partial<_iComplianceVariables> {}

interface iCommentRemovalPayload extends _iCompliancePayload {
   commentId: number;
}

interface iCommentPayload extends _iCompliancePayload {
   commentAuthor: string;
   commentText: string;
}

/***************/

type CoreStatusOptions = "incomplete" | "forReview" | "complete";
type PseudoStatusOptions = 'blocked' | 'fixed' | 'failed';
type AllStatusOptions = CoreStatusOptions | PseudoStatusOptions;

type TaskMethods = "FORREVIEW" | "COMPLETE" | "RESET";
type CommentMethods = "ADDCOMMENT" | "DELETECOMMENT";
type AllMethods = TaskMethods | CommentMethods;

interface Comment {
   id: number;
   author: string;
   comment: string;
}

interface ComplianceParams {
   isBlocked: boolean;
   isFailed: boolean;
   isFixed: boolean;
   worker: string;
   reviewer: string;
   status: CoreStatusOptions;
   comments: Comment[]
}

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




type PayloadTypes =
    | iCompliancePayload
    | iCommentRemovalPayload
    | iCommentPayload;

interface TaskAction {
    type: TaskMethods;
    payload: TaskPayload;
}

interface CommentAction {
    type: CommentMethods;
    payload: CommentPayload;
}

type DispatchActions = TaskAction | CommentAction;