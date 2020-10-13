function addComplianceDefaults(task) {
   task["compliance"] = task["compliance"] || {};

   const fieldDefaults = {
      worker: "",
      reviewer: "",
      status: "pending",
      workerFlag: false,
      comments: [],
   };

   Object.keys(fieldDefaults).forEach((k) => {
      if (!task["compliance"].hasOwnProperty(k)) {
         task["compliance"][k] = fieldDefaults[k];
      }
   });

   return task;
}

const parseTasks = function (acc, cur) {
   const { title, type } = cur;

   const task = addComplianceDefaults(cur);

   acc[type] = acc[type] || {};
   acc[type][title] = {
      ...cur,
   };

   return acc;
};

export default parseTasks;
