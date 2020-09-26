import React from "react";

interface Props {
   title: string;
   handler?: any;
}

const Title: React.FC<Props> = ({ title, handler = undefined }) => {
   const cl = `c-task__title`;

   return (
      <h1 className={cl} onClick={handler}>
         {title}
      </h1>
   );
};

export default Title;
