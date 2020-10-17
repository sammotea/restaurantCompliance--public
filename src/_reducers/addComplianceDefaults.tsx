const addComplianceDefaults = function (acc, cur) {
   const _cur = { ...cur };

   _cur["compliance"] = _cur["compliance"] || {};

   const fieldDefaults = {
      worker: "",
      reviewer: "",
      status: "incomplete",
      workerFlag: false,
      comments: [],
   };

   Object.keys(fieldDefaults).forEach((k) => {
      if (!_cur["compliance"].hasOwnProperty(k)) {
         _cur["compliance"][k] = fieldDefaults[k];
      }
   });

   acc.push(_cur);

   return acc;
};

export default addComplianceDefaults;
