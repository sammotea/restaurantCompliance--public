const sorters = {
   byStatus: function (statusesArr) {
      const statusOrder = {
         incomplete: 0,
         awaitingReview: 100,
         blocked: 100,
         complete: 1000,
         failed: 1000,
      };

      return [...statusesArr].sort((a, b) => {
         return statusOrder[a.key] - statusOrder[b.key];
      });
   },

   byKey: function (arr) {
      return [...arr].sort((a, b) => {
         const nameA = a.key.toUpperCase(),
            nameB = b.key.toUpperCase();

         if (nameA < nameB) return -1;
         if (nameA > nameB) return 1;
         return 0;
      });
   },
};

export default sorters;
