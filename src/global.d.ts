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
  permission?: string;
  requirements?: string[];
}
