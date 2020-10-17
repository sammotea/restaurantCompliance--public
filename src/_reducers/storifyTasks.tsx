const storifyTasks = function (acc, cur) {
   const _cur = cur;
   const {
      title,
      category,
      compliance: { status },
   } = _cur;

   acc[category] = acc[category] || {};
   acc[category][title] = _cur;

   return acc;
};

export default storifyTasks;
