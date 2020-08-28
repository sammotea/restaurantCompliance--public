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

interface iTask {
  title: string;
  type: string;
  permission?: string;
  requirements?: string[];
  isComplete: boolean;
}
