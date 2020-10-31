const transformers = {
   toCamel: function (str: string): string {
      // Stolen from https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
      return str
         .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0
               ? word.toLowerCase()
               : word.toUpperCase();
         })
         .replace(/\s+/g, "");
   },
};

export default transformers;
