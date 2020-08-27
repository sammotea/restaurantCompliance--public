interface iTaskAsJson {
  title: string;
  location: string;
  category: string;
  subtasks?: string[];
  frequency?: number;
  permission?: string;
}

interface iTaskMeta {
  [k: string]: Object;
}

interface iTaskList {
  [k: string]: Task;
}
type Task = {
  title: string;
  permission?: string;
  subtasks?: string[];
};
