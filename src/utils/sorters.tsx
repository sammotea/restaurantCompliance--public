const sorters = {
   reduceByCategory: function (acc, cur): iTasksByCategory {
      const { category } = cur;

      acc[category] = acc[category] || [];
      acc[category].push(cur);
      return acc;
   },

   byStatus: function (statusesArr: JSX.Element[]): JSX.Element[] {
      const statusOrder = {
         incomplete: 0,
         forReview: 100,
         blocked: 100,
         complete: 1000,
         failed: 1000,
      };

      return [...statusesArr].sort((a, b) => {
         return (
            statusOrder[a.props.title] - statusOrder[b.props.title]
         );
      });
   },

   byTitle: function (arr: JSX.Element[]): JSX.Element[] {
      return [...arr].sort((a, b) => {
         const nameA = a.props.title.toUpperCase(),
            nameB = b.props.title.toUpperCase();

         if (nameA < nameB) return -1;
         if (nameA > nameB) return 1;
         return 0;
      });
   },
};

export default sorters;
