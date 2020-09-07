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

interface iTask extends iTaskRaw {
  doer: string;
  reviewer: string;
  isComplete: boolean;
  hasProblem: boolean;
  isFailed: boolean;
  doerFlag?: boolean;
  subtasks?: string[];
}

interface TodoActions {
  stateSetter: any;
  init(stateSetter: any);
  setDoer(todo: iTask, doer: string): iTask;
  setReviewer(todo: iTask, reviewer: string): iTask;
  setComplete(todo: iTask, complete: boolean): iTask;
  setFail(todo: iTask, fail: boolean): iTask;
  setProblem(todo: iTask, problem: boolean): iTask;
  setFlag(todo: iTask, flag: boolean): iTask;
  markForReview(title: string, type: string, doer: string): void;
  problemize(
    title: string,
    type: string,
    doer: string,
    problem?: boolean
  ): void;
  complete(
    title: string,
    type: string,
    doer: string,
    reviewer: string
  ): void;
  fail(
    title: string,
    type: string,
    doer: string,
    reviewer: string
  ): void;
  flagDoer(title: string, type: string, flag: boolean): void;
  reset(title: string, type: string, key?: string): void;
}
