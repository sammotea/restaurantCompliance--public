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

type Task = {
  title: string;
  permission?: string;
  subtasks?: string[];
};
