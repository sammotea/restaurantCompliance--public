import React from "react";

interface Props {
   title: string;
}

const TasksByCategoryList: React.FC<Props> = ({ children }) => {
   return <ul className="c-taskSections">{children}</ul>;
};

export default TasksByCategoryList;
