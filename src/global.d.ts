interface iTasksByStatus {
   incomplete?: iTask[];
   forReview?: iTask[];
   complete?: iTask[];
}

interface iTaskAsJson {
   title: string;
   category: string;
   subtasks?: string[];
   frequency?: number;
   permission?: string;
}

interface iTasksByX {
   [k: string]: Object;
}

interface iTaskList {
   [k: string]: iTask;
}

interface iTaskRaw {
   title: string;
   category: string;
}

// interface iTask extends iTaskRaw {
//   worker: string;
//   reviewer: string;
//   isComplete: boolean;
//   hasProblem: boolean;
//   isFailed: boolean;
//   workerFlag?: boolean;
//   subtasks?: string[];
// }

interface iTask extends iTaskRaw {
   subtasks?: string[];
   compliance: iComplianceObj;
}

interface iComplianceObj {
   status: string;
   isBlocked?: boolean;
   isFailed?: boolean;
   worker: string;
   reviewer: string;
   workerFlag: boolean; // Quality assurance
   comments?: any;
}

interface TodoActions {
   stateSetter: any;
   init(stateSetter: any);
   setStatus(todo: iTask, status: string);
   setworker(todo: iTask, worker: string): iTask;
   setReviewer(todo: iTask, reviewer: string): iTask;
   setworkerFlag(todo: iTask, flag: boolean): iTask;
   forReview(
      title: string,
      category: string,
      worker: string,
      isBlocked?: boolean
   ): void;
   isComplete(
      title: string,
      category: string,
      worker: string,
      reviewer: string,
      workerFlag?: boolean
   ): void;
   isFailed(
      title: string,
      category: string,
      worker: string,
      reviewer: string
   ): void;
   reset(title: string, category: string, key?: string): void;
}
