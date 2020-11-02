interface _iTask {
   title: string;
   category: string;
   subtasks?: string[];
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
   comments?: iCommentsObj[];
}

interface iTask extends _iTask {
   compliance: iComplianceObj;
}

interface iCommentsObj {
   id: number;
   author: string;
   comment: string;
}

interface iTasksByStatus {
   incomplete?: iTask[];
   forReview?: iTask[];
   complete?: iTask[];
}

interface iTasksByCategory {
   [k: string]: iTask[];
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
