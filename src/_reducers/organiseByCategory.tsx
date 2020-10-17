const organiseByCategory = function (acc, cur) {
   const { category } = cur;

   acc[category] = acc[category] || [];
   acc[category].push(cur);
   return acc;
};

export default organiseByCategory;
