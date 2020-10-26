const iconify = {
   getClass: function (status) {
      let id = status;

      switch (status) {
         case "awaitingReview":
            id = "complete";
            break;
      }

      return `c-icon c-icon--${id}`;
   },
};

export default iconify;
