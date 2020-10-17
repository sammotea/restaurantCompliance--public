const organiseTasksByStatus = function (acc, cur) {
   const {
      title,
      category,
      compliance: { status },
   } = cur;

   acc[status] = acc[status] || [];
   acc[status].push(cur);

   return acc;
};

export default organiseTasksByStatus;
