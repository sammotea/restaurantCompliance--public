const pseudoUid = function () {
   return parseInt(
      new Date().getTime().toString() +
         Math.floor(Math.random() * 1000)
   );
};

export default pseudoUid;
