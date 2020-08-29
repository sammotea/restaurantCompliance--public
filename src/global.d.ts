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
  permission: string;
  hasProblem: boolean;
  isComplete: boolean;
  completedBy: string;
  confirmedBy: string;
  review: string;
  subtasks?: string[];
  comments?: [];
}
