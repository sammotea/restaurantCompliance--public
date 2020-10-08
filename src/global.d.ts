interface iTaskAsJson {
   title: string;
   type: string;
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
   type: string;
}

// interface iTask extends iTaskRaw {
//   worker: string;
//   reviewer: string;
//   isComplete: boolean;
//   hasProblem: boolean;
//   isFailed: boolean;
//   flagWorker?: boolean;
//   subtasks?: string[];
// }

interface iTask extends iTaskRaw {
   subtasks?: string[];
   compliance: iComplianceObj;
}

interface iComplianceObj {
   status: string;
   worker: string;
   reviewer: string;
   flagWorker: boolean; // Quality assurance
   comments?: any;
}

interface TodoActions {
   stateSetter: any;
   init(stateSetter: any);
   setStatus(todo: iTask, status: string);
   setworker(todo: iTask, worker: string): iTask;
   setReviewer(todo: iTask, reviewer: string): iTask;
   setflagWorker(todo: iTask, flag: boolean): iTask;
   forReview(
      title: string,
      type: string,
      worker: string,
      isBlocked?: boolean
   ): void;
   isComplete(
      title: string,
      type: string,
      worker: string,
      reviewer: string,
      flagWorker?: boolean
   ): void;
   isFailed(
      title: string,
      type: string,
      worker: string,
      reviewer: string
   ): void;
   reset(title: string, type: string, key?: string): void;
}
